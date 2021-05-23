package ccc.entity;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by sumengzhang on 5/19/21 9:55 AM
 */
public class ParamByDatesAndKeyword {
    @ApiModelProperty(name  = "keyword")
    private String keyword;
    @ApiModelProperty(name  = "startDate")
    private String startDate;
    @ApiModelProperty(name = "endDate")
    private String endDate;
    @ApiModelProperty(name = "location")
    private String Location;

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
