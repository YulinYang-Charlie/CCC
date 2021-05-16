from nltk.tokenize import sent_tokenize
import tweepy
import pandas as pd
import couchdb
import argparse
import json
from TwitterAPI.TwitterAPI import TwitterAPI
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from textblob import TextBlob


# apis = [{'consumer_key' : 'ZYS7ukLD70hVtrFQd8AOnu56M',
# 'consumer_secret' : 'xpDdcHBDx1byBia1S1nkWg3ZiEme8AMahhxUJGqAaO6XtjcQ3l',
# 'access_token' : '1124875820558716928-R1WKqtPqXQNHID5y2HN9jaIJrvZ8oL',
# 'access_token_secret': 'kWfBcsUmxcwdiDWo02XrIn8xTMrJJ9RW3AQOUUdrRIAgM'},
# {'consumer_key' : 'ZDNVVDoTHHYJaP0hX7nvxPVks',
# 'consumer_secret' : 'hqeWeBShuREkrDLFSqLqj4gS66lAP2kJwkbfUtYpD6yAI9J8PN',
# 'access_token' : '1223874444084408321-s3tRa4b1wCCIboaJ54JJtxSZYWee6Q',
# 'access_token_secret' : 'o7Zk9G9Oz4kbwtb9zYY8BUw2AkHGdIBsQYBTHcjCA5UZJ'}]


def get_args():
    """ Obtaining args from terminal """
    parser = argparse.ArgumentParser(description="Processing tweets")
    # filenames
    parser.add_argument("-db", "--db", type = str, required = True, 
                        help = "The Name of Database to store")
    parser.add_argument("-q", "--query", type = str, required = False, 
                        help = "The keywords for twitter searching")
    parser.add_argument("-n", "--num_tweets", type=int, required = True,
                        help = "The number of tweets to be pulled")

    args = parser.parse_args()
    
    return args

def dataprocess(data, q):
    ans = {}
    ans["keyword"] = q
    ans["tweet_id"] = data["id"]
    ans["created_at"] = data["created_at"]
    ans["text"] = data["text"]
    ans["user_id"] = data["user"]["id"]
    ans["username"] = data["user"]["screen_name"]
    ans["location"] = data["user"]["location"]
    ans["geo"] = data["geo"]
    ans["coordinates"] = data["coordinates"]
    ans["place"] = data["place"]


    # analysis = TextBlob(tweet)
    score = SentimentIntensityAnalyzer().polarity_scores(data["text"])
    neg = score['neg']
    neu = score['neu']
    pos = score['pos']

    if neg > pos:
        sentiment = "negative"
    elif pos > neg:
        sentiment = "positive"

    elif pos == neg:
        sentiment = "neutral"

    ans["sentiment"] = sentiment

    # ans["emotion"] = data["senpy"]["entries"][0]["onyx:hasEmotionSet"]


    return ans

def tweet_search(db, api, q, count):
    maxid = "9999999999999999999999999999"
    n = 200
    while count > 0:
        if count < 200:
            n = count
        count -= 200
        # try:

            # for i in api.request("search/tweets", {"q": q, 
            #                                   "count": 1, 
            #                                   "geocode": "-37.8390435045,145.106023031,201km"}):
            #     print(i)

        cursor = tweepy.Cursor(api.search, q=q, lang="en", geocode= "-37.8390435045,145.106023031,201km", max_id=maxid).items(n)
        
        for i in cursor:

            maxid = (i._json['id'])
        
            
            db.save(dataprocess(i._json, q))
        # except:
        #     print("Exceed rate limit")
        #     count += 200
        #     pass





def main():
    args = get_args()

    apis = json.load(open("api.json"))['APIs']

    auth = tweepy.OAuthHandler(apis[1]['consumer_key'], apis[1]['consumer_secret'])
    auth.set_access_token(apis[1]['access_token'], apis[1]['access_token_secret'])
    api = tweepy.API(auth)
    # api = TwitterAPI(apis[1]['consumer_key'], apis[1]['consumer_secret'], apis[1]['access_token'], apis[1]['access_token_secret'])

    try:
        # couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984') # Local test db
        couch = couchdb.Server('http://admin:admin@172.26.128.238:5984')
        db = couch.create(args.db)
    except couchdb.http.PreconditionFailed:
        db = couch[args.db]

    tweet_search(db, api, args.query, args.num_tweets)
    


if __name__ == "__main__":
    main()
