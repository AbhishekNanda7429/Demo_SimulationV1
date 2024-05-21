#Pre-Requisite
#----------------
#need to check the public static IP and make code changes for it in the code
#change the IP in postman so that we can use the APIs for posting the data into the db
#check if the right ports are open or not in network settings
#wget https://raw.githubusercontent.com/AbhishekNanda7429/Demo-Simulation-V1/feature/azure_V1/setup.sh run this to get the setup.sh into the VM
#sudo chmod +x setup.sh run this to make the setup.sh file executable
#then run the ./setup.sh 

#!/bin/bash

# Array to store success messages
success_messages=()

# 1. Update package lists
sudo apt-get update && success_messages+=("Package List Updation")

# 2. Install Python3, Node.js
sudo apt-get install -y python3 nodejs && success_messages+=("python3,nodejs Installation Successful")

# 3. Install npm
sudo apt install -y npm && success_messages+=("npm Installation Successful")

# 4. Install PM2
sudo npm install -g pm2 && success_messages+=("PM2 installation successful")

# 5. install MongoDB
cat /etc/lsb-release
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list   
sudo apt-get update
sudo apt-get install -y mongodb-org && success_messages+=("MongoDB installation successful")
sudo systemctl start mongod && success_messages+=("MongoDB started successfully")
#sudo systemctl status mongod
sudo systemctl enable mongod 

# 6. Make a working Directory
mkdir Mock_CRM
cd Mock_CRM

# 7. Clone a Git repository
git clone https://github.com/AbhishekNanda7429/Demo_SimulationV1.git && success_messages+=("Git repository cloned successfully")

# 8. Checkout to a different branch
cd Demo_SimulationV1
git checkout feature/azure_V1 && success_messages+=("Checked out to azure_v1 branch successfully")

# 9. Run Front-End
cd front-end
npm install

APP_NAME="FrontEnd_V1"
pm2 start npm --name "$APP_NAME" -- start && success_messages+=("React application started successfully")

# 10. Run BackEnd
cd ..
cd back-end-py
sudo apt-get install -y python3-pip
pip3 install flask pymongo cors

BACKEND_NAME="BackEnd_V1"
pm2 start python3 --name "$BACKEND_NAME" -- getData.py && success_messages+=("Python backend started successfully")

# Print success messages in a table format
printf "\n%-50s %-30s\n" "Operation" "Status"
printf "%-50s %-30s\n" "==========================================" "========="
for message in "${success_messages[@]}"; do
printf "%-50s %-30s\n" "$message" "✓"
done

echo "Setup completed successfully!!!!!"
