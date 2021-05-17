package ccc.service;

import ccc.entity.Region;

import java.util.List;

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

}
