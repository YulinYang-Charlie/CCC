package ccc.entity;

import org.springframework.stereotype.Component;

/**
 * Created by sumengzhang on 5/5/21 9:06 PM
 */
@Component
public class Region {

    public enum regionName{
        Victoria("victoria"),
        NewSouthWales("new south wales"),
        Queensland("queensland"),
        Tasmania("tasmania"),
        WesternAustralia("western australia"),
        SouthAustralia("south australia");
        private String name;

        regionName(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

    }
    private String name;
    private long total;
    private double percentage;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
}
