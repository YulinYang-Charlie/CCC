package ccc.service.serviceImp;

import ccc.entity.Hello;
import ccc.service.HelloService;
import org.springframework.stereotype.Service;

/**
 * Created by sumengzhang on 5/4/21 6:59 PM
 */
@Service
public class HelloServiceImpl implements HelloService {

    @Override
    public Hello sayHello() {
        Hello hello = new Hello();
        hello.setName("simon");
        return hello;

    }
}
