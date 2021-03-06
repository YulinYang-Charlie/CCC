package ccc.entity;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by sumengzhang on 5/19/21 12:11 AM
 */
public class ParamByKeyword {
    @ApiModelProperty(name = "keyword")
    private String keyword;

    @ApiModelProperty(name = "location")
    private String location;

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
