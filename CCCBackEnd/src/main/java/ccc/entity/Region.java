package ccc.entity;

import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by sumengzhang on 5/5/21 9:06 PM
 */
@Component
public class Region {

    public enum regionName{
        Victoria("Victoria"),
        NewSouthWales("New south wales"),
        Queensland("Queensland"),
        Tasmania("Tasmania"),
        WesternAustralia("Western australia"),
        SouthAustralia("South australia"),
        NorthernTerritory("Northern territory");
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
    private List<Integer> sentiment;


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

    public List<Integer> getSentiment() {
        return sentiment;
    }

    public void setSentiment(List<Integer> sentiment) {
        this.sentiment = sentiment;
    }
}
