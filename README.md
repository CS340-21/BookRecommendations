# BookRecommendations
![alt text](softwareArchitecture)

AWS Resources:
    We use role based access control (RBAC) to manages users, resources, and contributions. Ask Camille to create an AWS user for you.

#### Ember Development Instructions:
    1. Pull down project
    2. Run `npm install` if needed to install the project's dependencies
    3. Develop!
    4. Run `ember serve` to test the changes locally
    5. Create a PR for changes
    6. From the master branch, run `ember deploy development`
    7. Application available at http://dev-cs340-bookproject.s3-website.us-east-2.amazonaws.com/

#### Ember Deployment Instructions
    Prerequistites are that you must have an AWS access key and secret access key.
    1. Put the keys into a .env file in the root folder:
        `AWS_ACCESS_KEY={{key}}`
        `AWS_SECRET_KEY={{secretKey}}`
    2. From the master branch, run `ember deploy development` to deploy the Ember app to the dev S3
    3. Application available at http://dev-cs340-bookproject.s3-website.us-east-2.amazonaws.com/

#### API and Lambda Function
    The Ember app uses AWS API Gateway to hit a python, lambda function in AWS that goes on to hit GoogleBooksApi.
    The python code of the lambda function is the file lambda_function.py, but to edit this code you must have AWS
    credentials and edit it from AWS.

## Group Members
    - Camille Williford
    - Grant Anderson
    - Logan Tillman
    - Braden Martin
    - Braden Butler