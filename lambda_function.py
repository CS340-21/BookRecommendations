import json
from botocore.vendored import requests


def lambda_handler(event, context):
    #parsing parameters
    author = event['queryStringParameters'].get('inauthor', None)
    genre = event['queryStringParameters'].get('subject', None)
    
    #building api request string
    reqlink='https://www.googleapis.com/books/v1/volumes?q='
    if (author):
        reqlink=reqlink+'inauthor:'+ author + '+'
    if (genre):
        reqlink=reqlink+'subject:'+ genre + '+'
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
        pageCount=book['volumeInfo'].get('pageCount', None)
            
        thumbnail = None
        if(book['volumeInfo'].get('imageLinks')):
            thumbnail=book['volumeInfo']['imageLinks'].get('thumbnail', None)
            
        MR=book['volumeInfo'].get('maturityRating', None)
        reqResponse.append({'title': title, 'author': author, 'genre': genre, 'pageCount': pageCount, 'thumbnail': thumbnail, 'maturityRating': MR})
    return{
       "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
         "body": json.dumps(reqResponse),
        "isBase64Encoded": False,
    
        
    }