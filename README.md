# registry_react
Registry reader using ReactJS

## Demo
https://txzv6l-3000.csb.app/

## Description
This tool helps you read Windows registry file (extension `.reg`) without having to directly import the file into Registry Editor.

## Local setup
If you prefer to create a copy and run on it, follow these steps:

1. Install NodeJS

   Node can be installed from here: https://nodejs.org/en

2. Start shell and set the current working directory

   Run `cmd` (Windows) or `sh` (Linux) and use the following command to change the current directory:
   ```
   cd /path/to/registry_react
   ```

3. Clone the project into local machine

   Download this project by clicking the buttom **Code > Download ZIP**, or if you prefer Git, execute this Git command:
   ```
   git clone https://github.com/TanCongLap9/registry_react
   ```

4. Install dependencies

   Run the following command to install the required dependencies for the build process:
   ```
   npm install
   ```
   
5. Build the project
   
   Run the following command to build the project:
   ```
   npm run build
   ```

6. Install Live Server

   Run this command in the shell prompt to set up a local server:
   ```
   npm install live-server -g
   ```

7. Start a local server in the `build` folder
   
   After installing Live Server, run this command to start a local server:
   ```
   cd build
   live-server
   ```

## Package info

- Name: registry_react
- Author: TanCongLap9
- Language: JavaScript
- License: MIT
- Dependencies used: [ReactJS](https://react.dev/), [JQuery](https://jquery.com/), [CodeMirror](https://codemirror.net/), [BigInt](https://www.npmjs.com/package/BigInt)
