# registry_react
Registry reader using ReactJS

## Description
This tool helps you read Windows registry file (extension `.reg`) without having to directly import the file into Registry Editor.

## Local setup
1. Install node
   
   Node can be installed from here: https://nodejs.org/en
   
2. Install Live Server
   
   Run this command in the `cmd` prompt:
   ```
   npm install live-server -g
   ```

3. Start a local server in the `build` folder
   
   After installing Live Server, run this command to start a local server:
   ```
   CD /D <path\to\registry_react>\build
   live-server
   ```

   For example:
   ```
   CD /D C:\my_projects\registry_react\build
   live-server
   ```

## Package info

- Name: registry_react

- Author: TanCongLap9

- Language: JavaScript

- License: MIT

- Dependencies used: [ReactJS](https://react.dev/), [JQuery](https://jquery.com/), [CodeMirror](https://codemirror.net/), [BigInt](https://www.npmjs.com/package/BigInt)
