package ccc.service.serviceImp;

import ccc.entity.Region;
import ccc.service.ChartsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sumengzhang on 5/14/21 11:03 PM
 */
@Service
public class ChartsServiceImpl implements ChartsService {

    /**
     * 我也不知道的，先测试一波
     * @return
     */
    @Override
    public List<Region> getPureStatistics() {
        List<Region> res = new ArrayList<>();
        // fake data for testing
        if(Region.regionName.NewSouthWales.getName().equals("new south wales")){
            Region region = new Region();
            region.setName(Region.regionName.NewSouthWales.getName());
            region.setTotal(1000);
            region.setPercentage(0.6);
            res.add(region);
        }
        if(Region.regionName.Queensland.getName().equals("queensland")){
            Region region = new Region();
            region.setName(Region.regionName.Queensland.getName());
            region.setTotal(102);
            region.setPercentage(0.1);
            res.add(region);
        }
        if(Region.regionName.SouthAustralia.getName().equals("south australia")){
            Region region = new Region();
            region.setName(Region.regionName.SouthAustralia.getName());
            region.setTotal(134);
            region.setPercentage(0.2);
            res.add(region);
        }if(Region.regionName.WesternAustralia.getName().equals("western australia")){
            Region region = new Region();
            region.setName(Region.regionName.WesternAustralia.getName());
            region.setTotal(109);
            region.setPercentage(0.4);
            res.add(region);
        }
        if(Region.regionName.Tasmania.getName().equals("tasmania")){
            Region region = new Region();
            region.setName(Region.regionName.Tasmania.getName());
            region.setTotal(1000);
            region.setPercentage(0.6);
            res.add(region);
        }
        if(Region.regionName.Victoria.getName().equals("victoria")){
            Region region = new Region();
            region.setName(Region.regionName.Victoria.getName());
            region.setTotal(200);
            region.setPercentage(0.6);
            res.add(region);
        }
        return res;

    }
}
