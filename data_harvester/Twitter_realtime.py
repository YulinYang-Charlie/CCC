import tweepy
import couchdb
import argparse
import json
# import threading
from tweepy.streaming import StreamListener
import time

boundary = [96.81676569599999, -43.740509603, 159.109219008, -9.142175977] # Australia
# boundary = [140.961681984, -39.159189527500004, 149.976679008, -33.9806475865] # Victoria
# id_lst = []

class Twitter_Stream(StreamListener):
    def __init__(self, db):
        self.db = db

    def on_data(self, raw_data):
        self.process_data(raw_data)
        return True
    
    def process_data(self, raw_data):
        data = json.loads(raw_data)
        # id_lst.append(data['user']['id'])
        self.db.save(dataprocess(data))

    def on_error(self, status_code):
        if status_code == 420:
            return False

def get_args():
    """ Obtaining args from terminal """
    parser = argparse.ArgumentParser(description="Processing tweets")

    parser.add_argument("-db", "--db", type = str, required = True, 
                        help = "The Name of Database to store")

    args = parser.parse_args()
    
    return args

def dataprocess(data):
    ans = {}
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
        
    ans["created_at"] = date[-1]+month+date[2]+date[3][:2]
    ans["text"] = data["text"]
    ans["user_id"] = data["user"]["id"]
    ans["username"] = data["user"]["screen_name"]
    ans["location"] = data["user"]["location"]
    ans["geo"] = data["geo"]
    ans["coordinates"] = data["coordinates"]
    if "name" in data['place'].keys():
        ans["place"] = data["place"]["name"]
    else:
        ans["place"] = data["place"]

    for i in ans.keys():
        if ans[i] == "null":
            ans[i] = ""

    return ans

# def tweet_user_timeline(apis, db):
#     i = 0
#     api = apis[0]
#     while True:
#         if(len(id_lst) == 0):
#             continue

#         # requesting timeline
#         id = id_lst.pop(0)

#         # Collect data from Twitter and save into database
#         try:
#             for tweet in tweepy.Cursor(api.user_timeline, user_id=id).items(100):
#                 print(tweet)
#                 if "text" in tweet._json:
#                     # save tweet to database
#                     db.save(tweet._json)
#                 elif 'message' in tweet._json:
#                     print('ERROR %s: %s\n' % (tweet._json['code'], tweet._json['message']))
#         except:
#             i += 1
#             if i == len(apis):
#                 i = 0
#             api = apis[i]
#             print("Exceed rate limits, switch to the next api")
#             id_lst.append(id)
#             pass

def main():
    args = get_args()
    apis = []
    n = 0
    streamauth = 0
    
    # Initial API
    for i in json.load(open("api.json"))['APIs']:
        auth = tweepy.OAuthHandler(i['consumer_key'], i['consumer_secret'])
        auth.set_access_token(i['access_token'], i['access_token_secret'])
        if n == 0:
            streamauth = auth
        apis.append(tweepy.API(auth))
        n += 1

    # Connect to CouchDB and Create or Select the corresponding database
    try:
        # couch = couchdb.Server('http://sumengzhang:199784zsM@119.45.38.52:5984') # Local test db
        couch = couchdb.Server('http://admin:admin@172.26.128.238:5984')
        db = couch.create(args.db)
    except couchdb.http.PreconditionFailed:
        db = couch[args.db]

    # t1 = threading.Thread(target=tweet_user_timeline, args=(apis[1:], db))
    # t1.start()

    while True:
        try:
            stream = tweepy.Stream(auth=streamauth, listener=Twitter_Stream(db))
            stream.filter(locations=boundary,languages=["en"])
        except Exception as e:
            print(e)
            print('Disconnected...')
            time.sleep(5)
            continue

if __name__ == "__main__":
    main()