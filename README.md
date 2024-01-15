# Football dashboard - Service Design and Engineering Project

The objective of this project is to deliver a service that allows football fans to conveniently collect pertinent information and stay informed about the most recent developments in football matches worldwide, including upcoming matches, tailored to their personal preferences. The service can be broken down into three main components: the news aggregator, the football matches service, and the authentication module.

## Prerequisites
Before getting started, ensure that [Docker](https://www.docker.com/) is installed on your system.

Once Docker is installed, obtain API keys from Positionstack, RapidAPI, and Google OAuth. Edit the initial lines of the `env_vars.env.sample` file with the required API keys and rename it to `env_vars.env`.

## Usage
Load the environment variables into the current environment and initiate the system using docker-compose as outlined below:

```bash
source env_vars.env
docker-compose up --build
```

This action will launch the entire system, and within a few seconds, you can access the web interface at [http://localhost](http://localhost).

