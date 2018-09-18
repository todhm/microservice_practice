#!/bin/bash 

fails=""

inspect(){
    if [ $1 -ne 0 ]; then 
        fails="${fails} $2"
    fi
}

#run unit and integration tests 
docker-compose up -d --build 
docker-compose run users python manage.py test 
inspect $? users 
docker-compose run client npm test -- --coverage 
inspect $? client 
docker-compose down 

#return proper code 
if [ -n "${fails}" ]; then 
    echo "Tests failed: ${fails}"
    exit 1
else 
    echo "Tests passed!"
    exit 0 
fi 
