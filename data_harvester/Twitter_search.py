import tweepy
import couchdb
import argparse
import json
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

location = {"Victoria" : "-37.8390435045,145.106023031,300km", "New south wales": "-33.038583,146.4857016,500km",
         "Queensland": "-24.5840214,144.9539619,900km", "Tasmania" : "-42.2648831,146.6542134,300km",
         "South australia": "-30.5776848,135.2307377,700km", "Western australia": "-25.042261, 117.793221,1200km",
         "Northern territory":"-19.491411, 132.550964,900km"}


def get_args():
    """ Obtaining args from terminal """
    parser = argparse.ArgumentParser(description="Processing tweets")
    parser.add_argument("-db", "--db", type = str, required = True, 
                        help = "The Name of Database to store")
    parser.add_argument("-q", "--query", type = str, required = False, 
                        help = "The keywords for twitter searching")
    parser.add_argument("-n", "--num_tweets", type=int, required = True,
                        help = "The number of tweets to be pulled")
    parser.add_argument("-l", "--loc", type=str, required = True,
                        help = "The location of tweets (Victoria, New south wales, Queensland, Tasmania, South australia, Western australia, Northern territory)")

    args = parser.parse_args()
    
    return args

def dataprocess(data, q, loc):
    ans = {}
    ans["keyword"] = q
    ans["tweet_id"] = data["id"]
    date = data["created_at"].split()
    month = "0"
    if date[1] == "Jan":
        month = "01"
    elif date[1] == "Feb":
        month = "02"
    elif date[1] == "Mar":
        month = "03"
    elif date[1] == "Apr":
        month = "04"
    elif date[1] == "May":
        month = "05"
    elif date[1] == "Jun":
        month = "06"
    elif date[1] == "Jul":
        month = "07"
    elif date[1] == "Aug":
        month = "08"
    elif date[1] == "Sep":
        month = "09"
    elif date[1] == "Oct":
        month = "10"
    elif date[1] == "Nov":
        month = "11"
    else:
        month = "12"
        
    ans["created_at"] = date[-1]+month+date[2]
    ans["text"] = data["text"]
    ans["user_id"] = data["user"]["id"]
    ans["username"] = data["user"]["screen_name"]
    ans["location"] = loc
    ans["geo"] = data["geo"]
    ans["coordinates"] = data["coordinates"]
    ans["place"] = data["place"]

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

    for i in ans.keys():
        if ans[i] == "null":
            ans[i] = ""

    return ans

def tweet_search(db, apis, q, count, loc):
    maxid = "9999999999999999999999999999"
    n = 200
    api = apis[0]
    a = 0
    while count > 0:
        if count < 200:
            n = count
        count -= 200
        try:

            cursor = tweepy.Cursor(api.search, q=q, lang="en", geocode=location[loc], max_id=maxid).items(n)
            
            for i in cursor:

                maxid = (i._json['id'])
            
                
                db.save(dataprocess(i._json, q, loc))
        except:
            a += 1
            if a == len(apis):
                a = 0
            api = apis[a]
            print("Exceed rate limits, switch to the next api")
            count += 200
            pass

def main():
    args = get_args()

    apis = []
    for i in json.load(open("api.json"))['APIs']:
        auth = tweepy.OAuthHandler(i['consumer_key'], i['consumer_secret'])
        auth.set_access_token(i['access_token'], i['access_token_secret'])
        
        apis.append(tweepy.API(auth))

    try:
        # couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984') # Local test db
        couch = couchdb.Server('http://admin:admin@172.26.128.238:5984')
        db = couch.create(args.db)
    except couchdb.http.PreconditionFailed:
        db = couch[args.db]

    if args.loc not in location.keys():
        print("-l error")
        print("The locations of tweets are (Victoria, New south wales, Queensland, Tasmania, South australia, Western australia, Northern territory)")
        return
    
    tweet_search(db, apis, args.query, args.num_tweets, args.loc)

if __name__ == "__main__":
    main()
