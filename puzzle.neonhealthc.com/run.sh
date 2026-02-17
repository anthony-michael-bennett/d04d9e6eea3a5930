#!/bin/bash
docker run -p 9229:9229 -it --rm -v "$(pwd):/app" -w /app node:latest bash
