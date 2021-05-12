package ccc.controller;

import ccc.entity.Hello;
import ccc.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by sumengzhang on 4/15/21 9:41 PM
 */
@RestController
@RequestMapping(value = "/home")
public class HelloController {

    @Autowired
    private HelloService helloService;


    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @ResponseBody
    public Hello hello(){
        Hello h = helloService.sayHello();
        return h;
    }
}
