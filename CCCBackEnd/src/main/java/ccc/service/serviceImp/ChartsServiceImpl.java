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
            int tweetsCount = sofaRepository.findByLocation(location);
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
}
