package ccc.service;

import ccc.entity.Region;

import java.util.List;

/**
 * Created by sumengzhang on 5/5/21 9:33 PM
 */

public interface ChartService {
    /**
     * return all region data
     * @return
     */
    public List<Region> getPureStatistics();
}
