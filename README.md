# Banking App(UI)

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0._

## Installation

Clone this repository to your system using following command

```sh
git clone https://github.com/shrutidaundkar/Banking-app-ui.git
```

This project needs a specific version of [Node.js](https://nodejs.org/) v12 to run. But V14 also supports this version.
If you do not have that version then install _Node Version Manager_ using this [link](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).
After installing _Node Version Manager_ in terminal navigate to the project folder and use following command to change your current Node.js version to required V12

```sh
nvm install 14.21.3
nvm use 14.21.3
```

Then we can install all the dependencies

```sh
npm install
```

Also make sure you have angular CLI tools by running `npm install @angular/cli` in your terminal.

After all the dependencies have been installed we can go ahead and start the development server using following command

```sh
ng serve
```
## Linting
To add linter to the project add a dependancy using `ng add @angular-eslint/schematics` then you can verify the code by running

```sh
npm run lint
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

# Backend

The Backend Code developed in Java can be found [here](https://github.com/shrutidaundkar/bank-java). Please refer to its README file for setup instructions.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
