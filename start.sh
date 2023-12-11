#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo ".env file not found. Creating from .env.example..."
    cp .env.example .env
else
    echo ".env file already exists."
fi

# Run Docker Compose
docker compose up -d --build
