package ccc.service.serviceImp;

import ccc.entity.Region;
import ccc.entity.SofaRepository;
import ccc.entity.SofaRepositoryReal;
import ccc.service.ChartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by sumengzhang on 5/14/21 11:03 PM
 */
@Service
public class ChartsServiceImpl implements ChartsService {

    @Autowired
    private SofaRepository sofaRepository;

    @Autowired
    private SofaRepositoryReal sofaRepositoryReal;

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
        Map<String,Integer> countMap = sofaRepository.findByLocation();

        int total = 0;
        // TODO: multi times IO, should get all data one time?
        for(String location:locations){
            int tweetsCount = countMap.get(location);
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


    @Override
    public Map<String, Map<String, Object>> getTweetsByDatesAndKeyword(String keyword, String startDate, String endDate) {
        Map<String,Map<String,Object>> resultMap = new HashMap<>();

        Map<String,List<ArrayList>> map = sofaRepository.getTweetsCountByDatesAndKeywrod(keyword,startDate,endDate);
        Iterator it = map.entrySet().iterator();
        Map<String,Map<String,Integer>> resMap = new HashMap<>();
        for(String location:locations){
            resMap.put(location,new HashMap<String,Integer>());
        }
        int totalTweets = 0;
        while(it.hasNext()){
            Map.Entry entry = (Map.Entry)it.next();
            String curDate = (String)entry.getKey();
            List<ArrayList> curList = (List<ArrayList>)entry.getValue();
            totalTweets += curList.size();
            for (ArrayList list :curList){
                String location  = (String)list.get(0);
                Map<String,Integer> curMap = resMap.get(location);
                String sentiment = (String)list.get(1);
                curMap.put(sentiment,(curMap.getOrDefault(sentiment,0)+1));
                resMap.put(location,curMap);

            }

        }
        for(String location:locations){
            Map<String,Object> curRes = new HashMap<>();
            Map<String,Integer> curMap = resMap.get(location);
            int posiNum = curMap.getOrDefault("positive",0);
            int negNum = curMap.getOrDefault("negative",0);
            int neuNum = curMap.getOrDefault("neutral",0);
            int total  = posiNum+negNum+neuNum;
            List<Integer> sentiList = new ArrayList<>();
            sentiList.add(posiNum);
            sentiList.add(neuNum);
            sentiList.add(negNum);
            curRes.put("total",total);
            curRes.put("emotion",sentiList);
            curRes.put("percentage",(double)total/totalTweets);
            curRes.put("name",location);
            resultMap.put(location,curRes);
        }

        return resultMap;
    }

    @Override
    public Map<String, Integer> getRealTimeTweetsCount() {
        return sofaRepositoryReal.getRealTimeTweetsCount();
    }
}























