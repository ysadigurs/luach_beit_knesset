#!/bin/bash

# Find processes matching 'luach'
pids=$(ps -ef | grep -i 'luach' | grep -v 'grep' | awk '{print $2}')

# Check if there are any matching PIDs
if [ -z "$pids" ]; then
  echo "No matching processes found."
else
  # Kill the processes
  echo "Killing the following PIDs: $pids"
  # kill -9 $pids
fi