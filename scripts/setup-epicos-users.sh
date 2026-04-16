#!/bin/bash
# Privilege AI Users
users=("EricAi" "ParkoAi" "WillyAi")
for user in "${users[@]}"; do
    id "$user" &>/dev/null || useradd -m "$user"
    echo "$user ALL=(ALL) NOPASSWD: ALL" > "/etc/sudoers.d/$user"
done
echo "AI Users configured."
