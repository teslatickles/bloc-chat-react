import React from "react";
import Anime from "react-anime";
// import Prism from "prismjs";
import ".././styles/prism.css";
import ".././styles/landing_style.css";

let view = "";

const selectProject = () => (view = "python");

const Landing = () => (
  <div id="main-landing">
    <section className="Landing">
      <Anime opacity={[0, 1]} translateY={"1.5em"} delay={(e, i) => i * 800}>
        <h1 id="heading">ChatAt</h1>
        <img
          id="bubble2"
          src="/bubble2.png"
          alt="message bubble for person 1"
        />
        <img
          id="bubble1"
          src="/bubble1.png"
          alt="message bubble for person 2"
        />
        <p>
          This is a real-time chat site made by Hunter Hartline. Please take
          your time exploring this chat site, and please check out my other
          projects below!
        </p>
        <button id="chatrooms-button" to={"/main-chat"}>
          Enter Chat Rooms -->
        </button>
        {view === "python" ? (
          <pre id="code-block">
            <code className="language-javascript">
              {`#!/usr/bin/env node 'use strict'
const chalk = require('chalk')
const log = console.log
const error = console
let operatingSys = '' || 'ls /dev/';
if (process.platform === 'darwin') 
log(chalk.rgb(125, 125, 175)('must be on a mac'))
operatingSys = "osascript -e 'tell application "Finder" to eject 
  (every disk whose ejectable is true)'"
} else if (process.platform === 'linux') 
log(chalk.rgb(200, 100, 150)('must be on a linux machine'))
operatingSys = "sudo umount /dev/sd* --verbose"
} else if (process.platform === 'win32') 
   throw error(chalk.rgb(250, 50, 88)('Oh no! must you use windows? : 
   would you help me make this work for windows... please 貴方わすごいです！'))
}
const { exec } = require('child_process')
const child = exec(operati
child.stderr.on('data', (data) => 
  error(chalk.redBright(data))
child.on('exit', function (code, signal) 
  log(chalk.bold.hex('4271f4')(' All devices ejected! '))
});`}
            </code>
          </pre>
        ) : (
          <h1 id="landing-heading">ばっか</h1>
        )}
      </Anime>
    </section>
  </div>
);

export default Landing;
