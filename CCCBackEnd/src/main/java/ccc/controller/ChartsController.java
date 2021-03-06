package ccc.controller;

import ccc.entity.*;
import ccc.service.ChartsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public List<Region> getTweetCountByLocation(@RequestBody ParamByLocation param){
        String locationName  = param.getLocation();
        return chartsService.getTwittersCountByLocation(locationName);
    }

    /**
     *  无时间 各个地区的特定主题推特总数/比例
     */
    @ApiOperation("无时间 各个地区的特定主题推特总数/比例")
    @RequestMapping(value = "/getTweetsByKeyword", method = RequestMethod.POST)
    public Map<String,Map<String,Object>> getTweetCountByKeyword(@RequestBody ParamByKeyword param){
        String keyword  = param.getKeyword();
        String location = param.getLocation();
        return chartsService.getTweetsByKeyword(keyword,location);
    }

    /**
     * 有起止时间 有地区选项的特定主题推特总数/比例
     */
    @ApiOperation("有确定时间 有地区选项的特定主题推特总数/比例")
    @RequestMapping(value = "/getTweetsCountByDateAndkeyword",method = RequestMethod.POST)
    public Map<String,Map<String,Object>> getTweetsCountByDateAndKeyword(@RequestBody ParamByDateAndLocation param){
        String keyword = param.getKeyword();
        String date = param.getDate();
        return chartsService.getTweetsCountByDateAndKeyword(date,keyword);
    }

    @ApiOperation("有时间段  有地区选项的特定主题推特总数/比例")
    @RequestMapping(value = "/getTweetsCountByStartEndDateAndKeyword",method = RequestMethod.POST)
    public Map<String,Map<String,Map<String,Object>>> getTweetsCountByStartEndDateAndKeyword(@RequestBody ParamByDatesAndKeyword param){
        String keyword = param.getKeyword();
        String startDate = param.getStartDate();
        String endDate  = param.getEndDate();
        String location = param.getLocation();
        if(keyword.length()==0||startDate.length()==0||endDate.length()==0){
            System.out.println("parameter wrong");
            Map<String,Map<String,Map<String,Object>>> map = new HashMap<>();
            Map<String,Map<String,Object>> res = new HashMap<>();
            res.put("reason",new HashMap<>());
            map.put("Error",res);
            return map;
        }
        return chartsService.getTweetsByDatesAndKeyword(keyword,startDate,endDate,location);

    }

    @ApiOperation("Get tweets counts real time by 00-24")
    @RequestMapping(value = "/getRealTimeTweetsCount",method = RequestMethod.GET)
    public Map<String,Integer> getRealTimeTweetsCount(){
        return chartsService.getRealTimeTweetsCount();
    }


    @ApiOperation("Get tweets counts real time by week days")
    @RequestMapping(value = "/getRealTimeTweetsCountByWeekdays",method = RequestMethod.GET)
    public Map<String,Map<String,Integer>> getRealTimeByWeekdays(){
        return chartsService.getRealTimeByWeekdays();
    }






}
