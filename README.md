# SPanC-Lnc Website

## Running Locally

This assumes that the backend Python service is already running. See [SPanC-Lnc Backend](https://github.com/GenomicsMachineLearning/SPanC-Lnc_Backend/blob/main/README.md).

Steps to run locally include:
* Install Node and NPM.
* Install JavaScript/TypeScript dependencies.
* Run server and open browser.

### Installing NPM

```commandline
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
node -v # should print `v20.16.0`
npm -v # should print `10.8.1`
```

Instructions from [https://nodejs.org/en/download/package-manager]().

### Installing Dependencies

From the SPanC-Lnc-Website directory:
```commandline
npm install
```

### Run Server 

From the SPanC-Lnc-Website directory:
```commandline
npm run start
```

Open the web browser at [http://localhost:4200]()

## Other Commands

#### Building

```commandline
npm run build
```
