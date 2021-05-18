package ccc.controller;

import ccc.entity.Param;
import ccc.entity.Region;
import ccc.service.ChartsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @RequestMapping(value= "/getTweetCountByLocation",method = RequestMethod.POST)
    public List<Region> getTweetCountByLocation(@RequestBody Param param){
        String locationName  = param.getLocation();
        return chartsService.getTwittersCountByLocation(locationName);
    }

    /**
     *  无时间 各个地区的特定主题推特总数/比例
     */
    @ApiOperation("无时间 各个地区的特定主题推特总数/比例")
    @RequestMapping(value = "/getTweetsByKeyword", method = RequestMethod.POST)
    public Map<String,Map<String,Object>> getTweetCountByKeyword(@RequestBody Param param){
        String keyword  = param.getKeyword();
        return chartsService.getTweetsByKeyword(keyword);
    }

    /**
     * 有起止时间 有地区选项的特定主题推特总数/比例
     */
    @ApiOperation("有起止时间 有地区选项的特定主题推特总数/比例")
    @RequestMapping(value = "/getTweetsCountByDateAndkeyword",method = RequestMethod.POST)
    public Map<String,Map<String,Object>> getTweetsCountByDateAndKeyword(@RequestBody Param param){
        String keyword = param.getKeyword();
        String date = param.getDate();
        return chartsService.getTweetsCountByDateAndKeyword(date,keyword);

    }



}
