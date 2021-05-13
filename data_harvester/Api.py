import tweepy
import pandas as pd
import couchdb


# couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984')
try:
    couch = couchdb.Server('http://admin:admin@172.26.128.238:5984')
    db = couch.create('vic_tweets')
except couchdb.http.PreconditionFailed:
    db = couch['vic_tweets']

apis = [{'consumer_key' : 'ZYS7ukLD70hVtrFQd8AOnu56M',
'consumer_secret' : 'xpDdcHBDx1byBia1S1nkWg3ZiEme8AMahhxUJGqAaO6XtjcQ3l',
'access_token' : '1124875820558716928-R1WKqtPqXQNHID5y2HN9jaIJrvZ8oL',
'access_token_secret': 'kWfBcsUmxcwdiDWo02XrIn8xTMrJJ9RW3AQOUUdrRIAgM'},
{'consumer_key' : 'ZDNVVDoTHHYJaP0hX7nvxPVks',
'consumer_secret' : 'hqeWeBShuREkrDLFSqLqj4gS66lAP2kJwkbfUtYpD6yAI9J8PN',
'access_token' : '1223874444084408321-s3tRa4b1wCCIboaJ54JJtxSZYWee6Q',
'access_token_secret' : 'o7Zk9G9Oz4kbwtb9zYY8BUw2AkHGdIBsQYBTHcjCA5UZJ'}]

consumer_key = 'ZYS7ukLD70hVtrFQd8AOnu56M'
consumer_secret = 'xpDdcHBDx1byBia1S1nkWg3ZiEme8AMahhxUJGqAaO6XtjcQ3l'
access_token = '1124875820558716928-R1WKqtPqXQNHID5y2HN9jaIJrvZ8oL'
access_token_secret = 'kWfBcsUmxcwdiDWo02XrIn8xTMrJJ9RW3AQOUUdrRIAgM'

def main():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    maxid = "9999999999999999999999999999"
    while True:
        try:
            cursor = tweepy.Cursor(api.search, geocode= "-37.8390435045,145.106023031,201km", max_id=maxid).items(500)
            # tweets = []
            for i in cursor:
                # print(i._json['id'])
                maxid = (i._json['id'])
                # tweets.append(i.text)
                db.save(i._json)
        except:
            pass
        
    
    # cursor = tweepy.Cursor(api.search, geocode= "-37.8390435045,145.106023031,201km",since_id='1392505183368847361').items(1)
    # tweets = []
    # for i in cursor:
    #     print(i._json['id'])
    #     tweets.append(i.text)
        

    # df = pd.DataFrame({'tweets':tweets})
    
    


if __name__ == "__main__":
    main()
