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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
            'Access-Control-Allow-Credentials': 'true'
        },
         "body": json.dumps(ret),
        "isBase64Encoded": False,
    }
    
    #building our response body with the attributes we care about, looping through all the books and extracting the info we want
    for book in reqjson['items']:
        
        title=book['volumeInfo'].get('title', None)
        author=book['volumeInfo'].get('authors', [None])
        author=author[0]
        genre=book['volumeInfo'].get('categories', [None])
        genre=genre[0]
        pageCount=book['volumeInfo'].get('pageCount', None)
        id=book.get('id', None)
            
        thumbnail = None
        if(book['volumeInfo'].get('imageLinks')):
            thumbnail=book['volumeInfo']['imageLinks'].get('thumbnail', None)
            
        MR=book['volumeInfo'].get('maturityRating', None)
        reqResponse.append({'type': 'book', 'id': id, 'title': title, 'author': author, 'genre': genre, 'pageCount': pageCount, 'thumbnail': thumbnail, 'maturityRating': MR})
    return{
       "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
            'Access-Control-Allow-Credentials': 'true'
        },
         "body": json.dumps(reqResponse),
        "isBase64Encoded": False,
    
        
    }
