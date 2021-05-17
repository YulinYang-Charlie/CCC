package ccc.controller;

import ccc.entity.LocationEntity;
import ccc.entity.Region;
import ccc.service.ChartsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by sumengzhang on 5/14/21 10:44 PM
 */
@Api(value = "Charts Interface")
@CrossOrigin
@RestController
@RequestMapping("/charts")
public class ChartsController {

    @Autowired
    private ChartsService chartsService;
    @Autowired
    private CouchDbConnector couchDbConnector;
    /**
     *  Test: return pure statistics for all regions
     * @return
     */
    @ApiOperation("For test data ")
    @RequestMapping(value ="/regionChart",method = RequestMethod.GET)
    public List<Region> getPureStatistics(){
        return chartsService.getPureStatistics();
    }


    /**
     * Get tweets counts by location
     * @return
     */
    @ApiOperation("get tweets by location name")
    @RequestMapping(value= "getTweetCountByLocation",method = RequestMethod.POST)
    public List<Region> getTweetCountByLocation(@RequestBody LocationEntity entity){
        String locationName  = entity.getLocation();
        return chartsService.getTwittersCountByLocation(locationName);
    }


}
