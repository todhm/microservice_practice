#!/bin/bash 
type=$1
fails=""

inspect(){
    if [ $1 -ne 0 ]; then 
        fails="${fails} $2"
    fi
}

server() {
    docker-compose up -d --build
    docker-compose exec users python manage.py test
    inspect $? users
    docker-compose down
}

client() {
    docker-compose up -d --build
    docker-compose exec client npm test -- --coverage
    inspect $? client
    docker-compose down
}
e2e() {
    docker-compose -f docker-compose-prod.yml up -d --build
    docker-compose -f docker-compose-prod.yml exec -it users python manage.py recreate_db
    ./node_modules/.bin/cypress run --config baseUrl=http://localhost
    inspect $? e2e
    docker-compose -f docker-compose-prod.yml down
}
all(){
    docker-compose up -d --build 
    docker-compose exec users python manage.py test 
    inspect $? users 
    docker-compose exec client npm test -- --coverage
    inspect $? client 
    docker-compose down 
    e2e 
}

if [[ "${type}" == "server" ]]; then 
    echo "\n"
    echo "Running server-side tests!\n"
    server 
elif [[ "${type}" == "client" ]]; then 
    echo "\n"
    echo "Running client-side tests!\n"
    client 
elif [[ "$type" == "e2e" ]]; then 
    echo "\n"
    echo "Running e2e tests!\n"
    e2e
else 
    echo "\n"
    echo "Running all tests!\n"
    all 
fi 

#return proper code 
if [ -n "${fails}" ]; then 
    echo "\n"
    echo "Tests failed: ${fails}"
    exit 1
else 
    echo "\n"
    echo "Tests passed!"
    exit 0 
fi 
