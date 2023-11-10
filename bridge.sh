mkdir bridge
cd bridge
wget https://github.com/Yisus7u7/termux-ngrok/archive/refs/heads/main.zip
unzip main.zip
rm main.zip
mv ./termux-ngrok-main ./bridge-driver
cd bridge-driver
bash install.sh
