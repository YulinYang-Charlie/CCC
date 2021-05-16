package ccc.controller;

import ccc.entity.SofaRepository;
import ccc.pojo.Sofa;
import ccc.service.HelloService;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by sumengzhang on 4/15/21 9:41 PM
 */
@RestController
@RequestMapping(value = "/home")
public class HelloController {

    @Autowired
    private HelloService helloService;

    @Autowired
    private CouchDbConnector db;

    @Autowired
    private SofaRepository sofaRepository;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @ResponseBody
    public Object hello(){
         //SofaRepository sofaRepository  = new SofaRepository(db);
         return sofaRepository.getAverageSofaSize();
    }


    @RequestMapping(value = "/location",method = RequestMethod.GET)
    @ResponseBody
    public Object findByLocation(){
        //SofaRepository sofaRepository = new SofaRepository(db);
        return sofaRepository.findByLocation("Coodabeens");
    }

    @RequestMapping(value = "/name",method = RequestMethod.GET)
    @ResponseBody
    public List<Sofa> getByName(){
        //SofaRepository sofaRepository = new SofaRepository(db);
        return  sofaRepository.findByUsername("c_eid86");
    }







}
