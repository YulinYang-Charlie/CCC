package ccc.entity;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by sumengzhang on 5/17/21 11:19 PM
 */
public class ParamByDateAndLocation {
    @ApiModelProperty(name = "date")
    private String date;
    @ApiModelProperty(name = "keyword")
    private String keyword;

    @ApiModelProperty(name = "location")
    private String location;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
