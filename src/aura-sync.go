package main

import (
	"fmt"
	"os/exec"
	"strings"
	"time"
)

func checkSysctl(param string, expected string) bool {
	out, err := exec.Command("sysctl", "-n", param).Output()
	if err != nil {
		return false
	}
	return strings.TrimSpace(string(out)) == expected
}

func main() {
	fmt.Println("Aura-Sync-Go Reconciliator with PHP Monitoring started.")
	phpVersions := []string{"5.6", "7.4", "8.1", "8.2", "8.3"}

	for {
		// Reconcile system parameters
		params := map[string]string{
			"vm.min_free_kbytes":   "65536",
			"vm.swappiness":       "10",
			"vm.vfs_cache_pressure": "125",
			"vm.page-cluster":      "0",
			"net.ipv4.tcp_fastopen": "3",
		}

		for k, v := range params {
			if !checkSysctl(k, v) {
				exec.Command("sudo", "sysctl", "-w", fmt.Sprintf("%s=%s", k, v)).Run()
			}
		}

		// Monitor PHP-FPM Sockets
		for _, v := range phpVersions {
			socket := fmt.Sprintf("/var/run/php/php%s-fpm.sock", v)
			if _, err := exec.Command("ls", socket).CombinedOutput(); err != nil {
				fmt.Printf("Warning: PHP %s socket not found!\n", v)
				// Here we could attempt to restart the service
			}
		}

		time.Sleep(30 * time.Second)
	}
}
