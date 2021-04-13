import json
from botocore.vendored import requests


def lambda_handler(event, context):
    #parsing parameters
    author = event['queryStringParameters']['inauthor']
    genre = event['queryStringParameters']['subject']
    #author = event['inauthor']
    #genre = event['subject']
    
    #building api request string
    reqlink='https://www.googleapis.com/books/v1/volumes?q='
    reqlink=reqlink+'subject:'+genre
    reqlink=reqlink+'+inauthor:'+author
    reqlink=reqlink+'&maxResults=40'
    print('reqlink: '+reqlink)
    
    #making request to Books API
    req=requests.get(reqlink)
    reqjson=req.json()
    print(reqjson)
    reqResponse=[]
    
    #checking to make sure the Books API returned results, else return empty response object
    if(reqjson['totalItems']==0):
        kind=reqjson.get('kind', None)
        TI=reqjson.get('totalItems', None)
        ret={}
        ret['kind']=kind
        ret['totalItems']=TI
        return{
       "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
         "body": json.dumps(ret),
        "isBase64Encoded": False,
    }
    
    
    #building our response body with the attributes we care about, looping through all the books and extracting the info we want
    for book in reqjson['items']:
        title=book['volumeInfo'].get('title', None)
        author=book['volumeInfo'].get('authors', None)
        genre=book['volumeInfo'].get('categories', None)
        #if(book['volumeInfo'].get('industryIdentifiers', None)):
        #    ISBN=book['volumeInfo']['industryIdentifiers'][0].get('identifier', None)
        thumbnail=""
        if(book['volumeInfo'].get('imageLinks')):
            thumbnail=book['volumeInfo']['imageLinks'].get('thumbnail', 'null')
        MR=book['volumeInfo'].get('maturityRating', 'null')
        #print(book['volumeInfo'].get('title', 'null'))
        #print(book['volumeInfo']['authors'][0])
        #print(book['volumeInfo']['categories'][0])
        #print(book['volumeInfo']['industryIdentifiers'][0]['identifier'])
        #print(book['volumeInfo']['imageLinks']['thumbnail'])
        #print(book['volumeInfo']['maturityRating'])
        reqResponse.append({'title': title, 'author': author, 'genre': genre, 'thumbnail': thumbnail, 'maturityRating': MR})
        #reqResponse.append({'title': book['volumeInfo']['title'], 'author': book['volumeInfo']['authors'][0], 'genre': book['volumeInfo']['categories'][0], 'ISBN-13': book['volumeInfo']['industryIdentifiers'][0]['identifier'], 'thumbnail': book['volumeInfo']['imageLinks']['thumbnail'], 'maturityRating': book['volumeInfo']['maturityRating']})
    return{
       "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
         "body": json.dumps(reqResponse),
        #"body": json.dumps(req.json()),
        "isBase64Encoded": False,
    
        
    }
    
    ################################
    #genre = event['subject']
    #author = event['inauthor']
    
    #reqResponse = {}
    #reqResponse['genre'] = genre
    #reqResponse['author'] = author
    
    #responseObject = {}
    #responseObject['statusCode'] = 200
    #responseObject['headers'] = {}
    #responseObject['headers']['Content-Type'] = 'application/json'
    #responseObject['body'] = json.dumps(reqResponse)
    
    #return responseObject
