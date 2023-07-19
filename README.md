# Termux Remote Control (Windows) [no root]

![TermuxLogo](https://play-lh.googleusercontent.com/m3oqSZCwmitiZ-Im-CQu_rqT5eLHilOp5IudBynv3COJUumFzuQaP2dgTDxRL_03f4x2=w240-h480-rw)

This application is designed to manage your Termux from your computer. Turn your Android into a real dragon that can do all the same things as a Linux server. All this is available for Windows and has a GUI interface.

## Useful

Termux Remote Control allows the following:
- Uploading and downloading files
- Working with the internal Termux directory without the necessary storage packages. Simply install Termux and TermuxRC and discover the convenience.
- Full file control (in development)
- Code editor (in development)
- Package Manager (in development)
- Input Templatizer (pending)

## Install

> Note: you must have Node.js >= v18.x.x installed

Use the most convenient installation method, just copy the following into Termux:

    curl -O https://raw.githubusercontent.com/jxbc/termux-remote-control/main/install.sh
Then, just type in the following command and wait for the magic. All necessary modules will be installed and the server will start automatically:

    bash install.sh
Note that you do not need to run `install.sh` again after closing the script. To re-run TermuxRC simply open Termux and type `cd rc` and then `node rc`

## Install Windows App

Installation of the application on Windows is not required as such. Just [download the file from this link](https://github.com/jxbc/termux-remote-control/releases/tag/termux), make sure `rc.js` is running on your Android device, then launch the Windows App. The app will automatically find your Android if you are connected to the same router and DHCP is correctly configured.

Attention! We know about some bugs related to files and folders, I will fix them soon. 

## Donate

If you have been useful or like my idea, support my development in these areas if you have money, I would be very grateful to everyone! :)

**USDT (TRC20):** TQjF7YyR3H23BDtoeHCbrh6agi9V5NYuZN
**BTC:** 147BP3w2WgKhjHyQ24n4NHZtyudUQZBvXM
