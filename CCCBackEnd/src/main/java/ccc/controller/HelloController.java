package ccc.controller;

import ccc.entity.SofaRepository;
import ccc.service.HelloService;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by sumengzhang on 4/15/21 9:41 PM
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/home")
public class HelloController {

    @Autowired
    private HelloService helloService;

    @Autowired
    private CouchDbConnector db;

    @Autowired
    private SofaRepository sofaRepository;




    @RequestMapping(value = "/location",method = RequestMethod.GET)
    @ResponseBody
    public Object findByLocation(){
        return null;
    }









}
