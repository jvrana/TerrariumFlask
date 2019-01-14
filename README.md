# TerrariumFlask

**Starting backend**:

`python manage.py runserver`

**Starting front-end**:

`cd static; yarn start`

## Software Stack

Meta-backend - Aquarium
Backend - Python/Flask
Frontend - React-redux-webpack

## Requirements

* python
* redis (installed via `pip install -U "celery[redis]"`

## ToDo:

* Implement async tasks using Celery
* properly setup backend results for Celery tasks
* Design format
* Display connection name near login token
* better error handling server side
* notification framework for long running tasks (polling every?)
* hover tooltips for Connections,
* better profile (editing, name, ect.)
* only display user connections, ability to delete connections
* refresh connection status
* route errors 'Error 61 connecting to localhost:6379' to something like 'Redis database not on' or something << this is harder to do than previously thought...
* tasks stuck in pending forever...