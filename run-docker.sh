#!/bin/bash

# Собрать Docker-образ
docker build -t notes-app .

# Запустить контейнер
docker run -p 8080:80 -d notes-app
