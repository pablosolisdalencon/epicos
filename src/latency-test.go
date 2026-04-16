package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	start := time.Now()
	_, err := os.ReadFile("/dev/shm/epicos_tree.json")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}
	elapsed := time.Since(start)
	if elapsed < time.Millisecond {
		fmt.Printf("PASSED (%v)\n", elapsed)
	} else {
		fmt.Printf("FAILED (%v)\n", elapsed)
	}
}
