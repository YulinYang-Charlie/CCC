
import tweepy
import pandas as pd
import couchdb
import argparse
import json
import threading
from tweepy.streaming import StreamListener
import time


# apis = [{'consumer_key' : 'ZYS7ukLD70hVtrFQd8AOnu56M',
# 'consumer_secret' : 'xpDdcHBDx1byBia1S1nkWg3ZiEme8AMahhxUJGqAaO6XtjcQ3l',
# 'access_token' : '1124875820558716928-R1WKqtPqXQNHID5y2HN9jaIJrvZ8oL',
# 'access_token_secret': 'kWfBcsUmxcwdiDWo02XrIn8xTMrJJ9RW3AQOUUdrRIAgM'},
# {'consumer_key' : 'ZDNVVDoTHHYJaP0hX7nvxPVks',
# 'consumer_secret' : 'hqeWeBShuREkrDLFSqLqj4gS66lAP2kJwkbfUtYpD6yAI9J8PN',
# 'access_token' : '1223874444084408321-s3tRa4b1wCCIboaJ54JJtxSZYWee6Q',
# 'access_token_secret' : 'o7Zk9G9Oz4kbwtb9zYY8BUw2AkHGdIBsQYBTHcjCA5UZJ'}]

# boundary = "140.961681984, -39.159189527500004, 149.976679008, -33.9806475865" # Victoria
# boundary = "96.81676569599999, -43.740509603, 159.109219008, -9.142175977" # Australia
# boundary = [96.81676569599999, -43.740509603, 159.109219008, -9.142175977]
boundary = [140.961681984, -39.159189527500004, 149.976679008, -33.9806475865] # Victoria
id_lst = []




class Twitter_Stream(StreamListener):
    def __init__(self, db):
        self.db = db

    def on_data(self, raw_data):
        self.process_data(raw_data)
        return True
    
    def process_data(self, raw_data):
        data = json.loads(raw_data)
        id_lst.append(data['user']['id'])
        self.db.save(data)


    def on_error(self, status_code):
        if status_code == 420:
            return False



def get_args():
    """ Obtaining args from terminal """
    parser = argparse.ArgumentParser(description="Processing tweets")
    # filenames
    parser.add_argument("-db", "--db", type = str, required = True, 
                        help = "The Name of Database to store")

    args = parser.parse_args()
    
    return args


def tweet_user_timeline(apis, db):
    i = 0
    api = apis[0]
    while True:
        if(len(id_lst) == 0):
            continue

        # requesting timeline
        id = id_lst.pop(0)

        try:
            for tweet in api.request("statuses/user_timeline", {"user_id": id, "count": 100}):
                if "text" in tweet:
                    # print('USER: %s -- %s\n' % (tweet['user']['screen_name'], tweet['text']))
                    # save tweet to database
                    db.save(tweet)
                elif 'message' in tweet:
                    print('ERROR %s: %s\n' % (tweet['code'], tweet['message']))
        except:
            i += 1
            if i == len(apis):
                i = 0
            api = apis[i]
            print("Exceed rate limits, switch to the next api")
            id_lst.append(id)
            pass
    

# def tweet_realtime(api, db, boundary):
#     while True:
#         try:
#             for tweet in api.request("statuses/filter", {"locations": boundary}):
#                 if "text" in tweet:
#                     print('STREAM: %s -- %s\n' % (tweet['user']['screen_name'], tweet['text']))
#                     # save tweet to database
#                     db.save(tweet)
#                     # only get timeline for user tweeted with coordinates
#                     id_lst.append(tweet["user"]["id"])
#                 elif 'message' in tweet:
#                     print('ERROR %s: %s\n' % (tweet['code'], tweet['message']))
#         except:
#             pass

def main():
    args = get_args()
    apis = []
    n = 0
    streamauth = 0
    for i in json.load(open("api.json"))['APIs']:
        auth = tweepy.OAuthHandler(i['consumer_key'], i['consumer_secret'])
        auth.set_access_token(i['access_token'], i['access_token_secret'])
        if n == 0:
            streamauth = auth
        apis.append(tweepy.API(auth))
        n += 1

    try:
        couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984') # Local test db
        # couch = couchdb.Server('http://admin:admin@172.26.128.238:5984')
        db = couch.create(args.db)
    except couchdb.http.PreconditionFailed:
        db = couch[args.db]
    
    # t1 = threading.Thread(target=tweet_realtime, args=(apis[0], db, boundary))
    t2 = threading.Thread(target=tweet_user_timeline, args=(apis[1:], db))

    # t1.start()
    t2.start()
    while True:
        try:
            stream = tweepy.Stream(auth=streamauth, listener=Twitter_Stream(db))
            stream.filter(locations=boundary)
        except Exception as e:
            print(e)
            print('Disconnected...')
            time.sleep(5)
            continue

if __name__ == "__main__":
    main()