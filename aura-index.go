package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"time"
)

type Node struct {
	Name     string          `json:"name"`
	Path     string          `json:"path"`
	IsDir    bool            `json:"is_dir"`
	Children map[string]*Node `json:"children,omitempty"`
}

func scan(path string, depth int, maxDepth int) *Node {
	info, err := os.Lstat(path)
	if err != nil {
		return nil
	}

	node := &Node{
		Name:  info.Name(),
		Path:  path,
		IsDir: info.IsDir(),
	}

	if node.IsDir && depth < maxDepth {
		entries, err := os.ReadDir(path)
		if err == nil {
			node.Children = make(map[string]*Node)
			for _, entry := range entries {
				if entry.Name() == ".git" || entry.Name() == "node_modules" {
					continue
				}
				childPath := filepath.Join(path, entry.Name())
				childNode := scan(childPath, depth+1, maxDepth)
				if childNode != nil {
					node.Children[entry.Name()] = childNode
				}
			}
		}
	}

	return node
}

func main() {
	target := "/dev/shm/epicos_tree.json"
	root := "/app"
	maxDepth := 5

	for {
		tree := scan(root, 0, maxDepth)
		data, err := json.MarshalIndent(tree, "", "  ")
		if err == nil {
			_ = os.WriteFile(target, data, 0644)
		}
		time.Sleep(10 * time.Second)
	}
}
