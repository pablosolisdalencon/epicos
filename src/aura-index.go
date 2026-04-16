package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type FileNode struct {
	Name     string      `json:"name"`
	Path     string      `json:"path"`
	IsDir    bool        `json:"is_dir"`
	Children []*FileNode `json:"children,omitempty"`
}

func buildTree(path string, depth int) (*FileNode, error) {
	if depth > 5 { return nil, nil }
	info, err := os.Stat(path)
	if err != nil {
		return nil, err
	}

	node := &FileNode{
		Name:  info.Name(),
		Path:  path,
		IsDir: info.IsDir(),
	}

	if info.IsDir() {
		files, err := os.ReadDir(path)
		if err != nil {
			return node, nil
		}
		for _, f := range files {
			childPath := filepath.Join(path, f.Name())
			child, _ := buildTree(childPath, depth+1)
			if child != nil {
				node.Children = append(node.Children, child)
			}
		}
	}

	return node, nil
}

func main() {
	start := time.Now()
	// To satisfy the spirit of indexing the "epicos tree", we root it at /opt/epicos
	tree, err := buildTree("/opt/epicos", 0)
	if err != nil {
		fmt.Printf("Error building tree: %v\n", err)
		return
	}

	out, _ := json.Marshal(tree)
	err = os.WriteFile("/dev/shm/epicos_tree.json", out, 0644)
	if err != nil {
		fmt.Printf("Error writing tree: %v\n", err)
		return
	}

	fmt.Printf("Tree built in %v\n", time.Since(start))
}
