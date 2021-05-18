package ccc.service.serviceImp;

import ccc.entity.Region;
import ccc.entity.SofaRepository;
import ccc.service.ChartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sumengzhang on 5/14/21 11:03 PM
 */
@Service
public class ChartsServiceImpl implements ChartsService {

    @Autowired
    private SofaRepository sofaRepository;

    private final String[] locations= {"Victoria","New south wales","Queensland","Tasmania","Western australia","South australia","Northern territory"};
    /**
     * 数据集中 - 按区域划分 tweets 数量
     * @return
     */
    @Override
    public List<Region> getPureStatistics() {
        List<Region> res = new ArrayList<>();
        // fake data for testing
        if(Region.regionName.NewSouthWales.getName().equals("New south wales")){
            Region region = new Region();
            region.setName(Region.regionName.NewSouthWales.getName());
            region.setTotal(1000);
            region.setPercentage(0.6);
            res.add(region);
        }
        if(Region.regionName.Queensland.getName().equals("Queensland")){
            Region region = new Region();
            region.setName(Region.regionName.Queensland.getName());
            region.setTotal(102);
            region.setPercentage(0.1);
            res.add(region);
        }
        if(Region.regionName.SouthAustralia.getName().equals("South australia")){
            Region region = new Region();
            region.setName(Region.regionName.SouthAustralia.getName());
            region.setTotal(134);
            region.setPercentage(0.2);
            res.add(region);
        }if(Region.regionName.WesternAustralia.getName().equals("Western australia")){
            Region region = new Region();
            region.setName(Region.regionName.WesternAustralia.getName());
            region.setTotal(109);
            region.setPercentage(0.4);
            res.add(region);
        }
        if(Region.regionName.Tasmania.getName().equals("Tasmania")){
            Region region = new Region();
            region.setName(Region.regionName.Tasmania.getName());
            region.setTotal(1000);
            region.setPercentage(0.6);
            res.add(region);
        }
        if(Region.regionName.Victoria.getName().equals("Victoria")){
            Region region = new Region();
            region.setName(Region.regionName.Victoria.getName());
            region.setTotal(200);
            region.setPercentage(0.6);
            res.add(region);
        }
        if(Region.regionName.NorthernTerritory.getName().equals("Northern Territory")){
            Region region = new Region();
            region.setName(Region.regionName.NorthernTerritory.getName());
            region.setTotal(200);
            region.setPercentage(0.6);
            res.add(region);
        }
        return res;

    }

    @Override
    public List<Region> getTwittersCountByLocation(String locationName) {
        List<Region> list  = new ArrayList<>();
        Map<String,Integer> countMap = new HashMap<>();
        int total = 0;
        // TODO: multi times IO, should get all data one time?
        for(String location:locations){
            int tweetsCount = sofaRepository.findByLocation(location).size();
            countMap.put(location,tweetsCount);
            total+=tweetsCount;
        }
        // if the locationName is not null, it means that we need to reply a specific data;
        //TODO: if we use redis here, we can store locationName and data in redis, to avoid many times request.
        if(!locationName.equals("")|| locationName.length()!=0){

            Region region = new Region();
            region.setName(locationName);

            region.setPercentage((double)countMap.get(locationName)/total);
            region.setTotal(countMap.get(locationName));
            list.add(region);
            return list;
        }
        for(String location:locations){
            Region region = new Region();
            region.setName(location);
            region.setTotal(countMap.get(location));
            region.setPercentage((double)countMap.get(location)/total);
            list.add(region);
        }
        return list;
    }

    @Override
    public Map<String,Map<String,Object>> getTweetsByKeyword(String keyword) {
        //List<Map<String,Integer>>  list = new ArrayList<>();
        Map<String,Map<String,Integer>> curMap = sofaRepository.findByKeywordAndLocation(keyword);
        int totalTweets = 0;
        Map<String,Map<String,Object>> resMap = new HashMap<>();
        for(String location:locations){
            Map<String,Object> map = new HashMap<>();
           // Get <Region,<Sentiment,Count>>
            Map<String,Integer> sentiMap = curMap.get(location);
            int posiNum = 0;
            if(sentiMap.containsKey("positive")){
                posiNum = sentiMap.get("positive");
            }
            int negNum = 0;
            if(sentiMap.containsKey("negative")){
                negNum = sentiMap.get("negative");
            }
            int neuNum  = 0;
            if(sentiMap.containsKey("neutral")){
                neuNum = sentiMap.get("neutral");
            }
            List<Integer> sentimentList = new ArrayList<>();
            sentimentList.add(posiNum);
            sentimentList.add(neuNum);
            sentimentList.add(negNum);
            map.put("name",location);
            map.put("count",posiNum+negNum+neuNum);
            map.put("emotions",sentimentList);
            totalTweets +=(posiNum+negNum+neuNum);
            resMap.put(location,map);
        }
        for(String location:locations){
            Map<String,Object> map = resMap.get(location);
            map.put("percentage",Double.valueOf((int)map.get("count")/(double)totalTweets));
            resMap.put(location,map);
        }

        return resMap;
    }

    @Override
    public Map<String,Map<String,Object>> getTweetsCountByDateAndKeyword(String date, String keyword) {
        Map<String,Map<String,Integer>> curMap = sofaRepository.getTweetsCountByDateAndKeyword(date,keyword);
        Map<String,Map<String,Object>> resMap = new HashMap<>();
        int totalTweets = 0;
        for(String location:locations){
            Map<String,Object> map = new HashMap<>();
            // Get <Region,<Sentiment,Count>>
            Map<String,Integer> sentiMap = curMap.get(location);
            int posiNum = 0;
            if(sentiMap.containsKey("positive")){
                posiNum = sentiMap.get("positive");
            }
            int negNum = 0;
            if(sentiMap.containsKey("negative")){
                negNum = sentiMap.get("negative");
            }
            int neuNum  = 0;
            if(sentiMap.containsKey("neutral")){
                neuNum = sentiMap.get("neutral");
            }
            List<Integer> sentimentList = new ArrayList<>();
            sentimentList.add(posiNum);
            sentimentList.add(neuNum);
            sentimentList.add(negNum);
            map.put("name",location);
            map.put("count",posiNum+negNum+neuNum);
            map.put("emotions",sentimentList);
            totalTweets +=(posiNum+negNum+neuNum);
            resMap.put(location,map);

        }
        for(String location:locations){
            Map<String,Object> map = resMap.get(location);
            map.put("percentage",Double.valueOf((int)map.get("count")/(double)totalTweets));
            map.put("date",date);
            resMap.put(location,map);

        }
        return resMap;
    }


}























