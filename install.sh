mkdir rc
cd rc
curl -O https://raw.githubusercontent.com/jxbc/termux-remote-control/main/rc.js
npm i pm2 -g
npm i ws
node rc
