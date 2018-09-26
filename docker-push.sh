#!/bin/sh

if [ -z "$TRAVIS_PULL_REQUEST"] || [ "$TRAVIS_PULL_REQUEST" == "false" ]
then 
    if [ "$TRAVIS_BRANCH" == "staging" ] || \
       [ "$TRAVIS_BRANCH" == "production"]
    then 
        curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"

        unzip awscli-bundle.zip
        ./awscli-bundle/instal -b ~/bin/aws
        export PATH=~/bin:$PATH 

        eval $(aws ecr get-login --region ap-northeast-2 --no-include-email)
        export TAG=$TRAVIS_BRANCH 
        export REPO=$AWS_ACCOUNT_ID.dk.ecr.ap-northeast-2.amazonaws.com
    fi

    if ["$TRAVIS_BRANCH" == "staging"] || \
       ["$TRAVIS_BRANCH" == "production"]
    then 
        docker build $USERS_REPO -t $USERS:$COMMIT -f Dockerfile-prod 
        docker tag $USERS:$COMMIT $REPO/$USERS:$TAG
        docker push $REPO/$USERS:$TAG

        docker build $USERS_DB_REPO -t $USERS_DB:$COMMIT -f Dockerfile
        docker tag $USERS_DB:$COMMIT $REPO/$USERS_DB:$TAG
        docker push $REPO/$USERS_DB:$TAG

        docker build $CLIENT_REPO -t $CLIENT:$COMMIT -f Dockerfile-prod --build-arg REACT_APP_USERS_SERVICE_URL=TBD
        docker tag $CLIENT:$COMMIT $REPO/$CLIENT:$TAG
        docker push $REPO/$CLIENT:$TAG

        docker build $SWAGGER_REPO -t $SWAGGER:$COMMIT -f Dockerfile-prod
        docker tag $SWAGGER:$COMMIT $REPO/$SWAGGER:$TAG
        docker push $REPO/$SWAGGER:$TAG
    fi
fi