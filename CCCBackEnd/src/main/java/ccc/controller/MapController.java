package ccc.controller;

import ccc.pojo.Sofa;
import org.ektorp.CouchDbConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by sumengzhang on 5/4/21 7:10 PM
 */

@RestController
@RequestMapping(value  = "/map")
public class MapController {


    @Autowired
    private CouchDbConnector couchDbConnector;

    /**
     * Test the database connection
     * @return
     */
    @RequestMapping(value = "getSofa",method = RequestMethod.GET )
    public Sofa getSofa() throws Exception {
        String id = "b758e336598707a7f136e6bf100bc627";
        Sofa sofa = couchDbConnector.find(Sofa.class, id);
        return sofa;
    }
}
