#!/bin/bash

# Command to log top processes by CPU usage
ps -eo pid,ppid,%cpu,%mem --sort=-%cpu | head -n 6 >> //home/sujal/Desktop/intern/2025-01-21/cronjob/5minLogs.log

#timestamp
echo "Log generated on: $(date)" >> //home/sujal/Desktop/intern/2025-01-21/cronjob/5minLogs.log
