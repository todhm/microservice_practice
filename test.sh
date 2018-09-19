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

docker-compose -f docker-compose-prod.yml up -d --build
docker-compose -f docker-compose-prod.yml run users python manage.py recreate_db
./node_modules/.bin/cypress run --config baseUrl=http://localhost
inspect $? e2e 
docker-compose -f docker-compose-prod.yml down 


#return proper code 
if [ -n "${fails}" ]; then 
    echo "Tests failed: ${fails}"
    exit 1
else 
    echo "Tests passed!"
    exit 0 
fi 
