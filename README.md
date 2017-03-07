# Lana! NPM scripts with better UX 🌈

## What?

Lana! provides a convenient, global API to browse and run NPM scripts in your projects.
Also, it makes managing your documentation easier by pulling out descriptions from your projects' README.md file.

## Why?

Do you happen to switch between your projects often and rely on reading package.json to look up the dev tasks? 
Well, I do. So give it a try. Your OCD will thank you.

## Setup

### Yarn
    $ yarn global add lana

### NPM
    $ npm i -g lana

## Usage

In a Javascript project with `package.json`, type:

    $ lana

You can share documentation between lana! and README.md by tagging content, like in this imaginary CMS (Cat Management System).

### Usage

<!--lana: start-->
#### Start web server
    $ npm start

<!--lana: download kittens-->
#### Download kittens
    $ npm run download-kittens

<!--lana: upload-kittens-->
#### Upload kittens
    $ npm run upload-kittens

<!--lana: integration-db-download-->
#### Download database for integration tests
    $ npm run integration-db-download


