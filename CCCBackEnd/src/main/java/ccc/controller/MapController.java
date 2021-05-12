package ccc.controller;

import ccc.entity.Region;
import ccc.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by sumengzhang on 5/4/21 7:10 PM
 */

@RestController
@RequestMapping(value  = "/v1")
public class MapController {


    @Autowired
    private ChartService chartService;
    /**
     *  return pure statistics for all regions
     * @return
     */
    @RequestMapping(value ="/chart",method = RequestMethod.GET)
    public List<Region> getPureStatistics(){
        return chartService.getPureStatistics();
    }


}
