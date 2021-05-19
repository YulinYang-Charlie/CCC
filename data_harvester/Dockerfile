FROM ubuntu:latest
FROM python:3.6.6
ADD Twitter_realtime.py /tmp/Twitter_realtime.py
ADD api.json /api.json
ADD requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt
ENTRYPOINT ["python","/tmp/Twitter_realtime.py","-db","harvesttest"]

