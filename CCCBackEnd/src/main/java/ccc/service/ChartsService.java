package ccc.service;

import ccc.entity.Region;

import java.util.List;
import java.util.Map;

/**
 * Created by sumengzhang on 5/14/21 11:03 PM
 */


public interface ChartsService {

    /**
     * fake data for testing
     * @return
     */
    public List<Region> getPureStatistics();


    /**
     *
     */
    public List<Region> getTwittersCountByLocation(String locationNameOrNull);

    List<Map<String,Integer>> getTweetsByKeyword(String keyword);

    List<Region> getTweetsCountByDateAndKeyword(String date, String keyword);
}
