#!/bin/bash

source venv/bin/activate

export APP_ENV=prd
export FLASK_DEBUG=1

python application.py
