# Video-chat-WebRTC
A 1-on-1 video chat application build with socket.io and WebRTC interface.

## Installation
- run 'npm install' or 'yarn' to install all dependencies
- open up your terminal and run 'npm dev' or 'yarn dev'

## Running on browser
- You should replace the 'HOST' value inside server.js with whatever your local network IP address is.
- eg. open the browser at https://192.168.0.5:3000/ 

This is a small application which is showcasing a way to enable two peers to exchange media streams in a bidirectinal mannner.
It's using a socket.io to create a signaling service for sending the session description as well as ICE candidates.

Contributions are always welcome.
