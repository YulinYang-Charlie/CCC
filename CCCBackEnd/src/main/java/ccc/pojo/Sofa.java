package ccc.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by sumengzhang on 5/13/21 4:28 PM
 */
public class Sofa {

    @JsonProperty("_id")
    private String id;

    @JsonProperty("_rev")
    private String rev;

    @JsonProperty("keyword")
    private String keyword;

    @JsonProperty("created_at")
    private String createdDate;

    @JsonProperty("tweet_id")
    private String tweetId;

    @JsonProperty("text")
    private String text;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("username")
    private String userName;

    @JsonProperty("location")
    private String location;

    @JsonProperty("geo")
    private String geo;

    @JsonProperty("coordinates")
    private String coordinates;

    @JsonProperty("place")
    private String place;

    @JsonProperty("sentiment")
    private String sentiment;

//    private String emotion;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRev() {
        return rev;
    }

    public void setRev(String rev) {
        this.rev = rev;
    }

    public String getTweetId() {
        return tweetId;
    }

    public void setTweetId(String tweetId) {
        this.tweetId = tweetId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGeo() {
        return geo;
    }

    public void setGeo(String geo) {
        this.geo = geo;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

//    public String getEmotion() {
//        return emotion;
//    }
//
//    public void setEmotion(String emotion) {
//        this.emotion = emotion;
//    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;

    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }
}