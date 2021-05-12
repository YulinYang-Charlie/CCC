import tweepy
import pandas as pd
import couchdb

couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984')
db = couch['db_test']

consumer_key = 'ZYS7ukLD70hVtrFQd8AOnu56M'
consumer_secret = 'xpDdcHBDx1byBia1S1nkWg3ZiEme8AMahhxUJGqAaO6XtjcQ3l'
access_token = '1124875820558716928-R1WKqtPqXQNHID5y2HN9jaIJrvZ8oL'
access_token_secret = 'kWfBcsUmxcwdiDWo02XrIn8xTMrJJ9RW3AQOUUdrRIAgM'

def main():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    cursor = tweepy.Cursor(api.search, q="COVID").items(20)
    tweets = []
    for i in cursor:
        # print(i._json)
        tweets.append(i.text)
        db.save(i._json)
        
    df = pd.DataFrame({'tweets':tweets})
    

    print(df)
    


if __name__ == "__main__":
    main()
