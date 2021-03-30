import json
from botocore.vendored import requests


def lambda_handler(event, context):
    genre=event['subject']
    print(event)
    req=requests.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction+inauthor:keyes')
    print("printing req")
    print(req.json())
    reqjson=req.json()
    print("kind: " + reqjson['items'][0]['volumeInfo']['title'])
    return{
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "Genre ": genre
        })
        
    }
    #genre = event['queryStringParameters']['subject']
    #author = event['queryStringParameters']['inauthor']
    
    #reqResponse = {}
    #reqResponse['genre'] = genre
    #reqResponse['author'] = author
    
    #responseObject = {}
    #repsonseObject['statusCode'] = 200
    ##responseObject['headers'] {}
    #repsonseObject['headers']['Content-Type'] = 'application/json'
    #repsonseObject['body'] = json.dumps(reqResponse)
    
    #return responseObject
