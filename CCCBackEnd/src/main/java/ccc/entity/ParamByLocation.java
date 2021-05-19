package ccc.entity;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by sumengzhang on 5/19/21 12:12 AM
 */
public class ParamByLocation {
    @ApiModelProperty(name = "location")
    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
