#!/bin/bash

# Task 1: Directory Management

# checking if directory already exists
DIR="/home/sujal/project_files"
if [ -d "$DIR" ]; then
    echo "Directory '$DIR' already exists."
else
    # Create the directory
    mkdir $DIR
    echo "Directory '$DIR' created successfully."
fi


# Task 2: User and Group Management

# # Create the group named developers
echo "Creating the 'group named 'developers'"
sudo groupadd developers

# # Create the user internal_user
echo "Creating the new user named 'intern_user'"
sudo useradd intern_user

echo "Adding the user named intern_user to the developers group"
sudo usermod -aG developers intern_user

echo "Setting an appropriate password for the user"
sudo passwd intern_user


# Task 3: Permissions and Ownership

echo "Changing the ownership of the project_files directory too intern_user and group developers"
sudo chown intern_user:developers /home/sujal/project_files
# # Set permissions on the directory
echo "Setting the permissions to owners, groups and others"
# # they have 750 permission
sudo chmod 750 /home/sujal/project_files

# Task 4: Additional Tasks
sudo touch /home/sujal/project_files/welcome.txt
echo "Text file welcome.txt has been created"

sudo tee /home/sujal/project_files/welcome.txt > /dev/null <<EOF
Creation Date: $(date)
Directory Path: /home/sujal/project_files
Owner: $(stat -c '%U' /home/sujal/project_files)
Group: $(stat -c '%G' /home/sujal/project_files)
EOF

# Task 5: Verification
echo "Verifying directory creation and permissions:"
ls -ld /home/sujal/project_files

echo "Verifying user creation and group membership:"
id intern_user

echo "Verifying file creation and contents:"
sudo cat /home/sujal/project_files/welcome.txt