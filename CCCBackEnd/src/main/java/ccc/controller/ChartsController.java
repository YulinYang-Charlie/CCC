package ccc.controller;

import ccc.entity.Region;
import ccc.service.ChartsService;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by sumengzhang on 5/14/21 10:44 PM
 */
@CrossOrigin
@RestController
@RequestMapping("/charts")
public class ChartsController {

    @Autowired
    private ChartsService chartsService;
    @Autowired
    private CouchDbConnector couchDbConnector;
    /**
     *  return pure statistics for all regions
     * @return
     */
    @RequestMapping(value ="/regionChart",method = RequestMethod.GET)
    public List<Region> getPureStatistics(){
        return chartsService.getPureStatistics();
    }

}
