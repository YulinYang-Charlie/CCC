package ccc.entity;

import ccc.pojo.Sofa;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.ektorp.support.CouchDbRepositorySupport;
import org.ektorp.support.GenerateView;
import org.ektorp.support.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sumengzhang on 5/15/21 12:07 AM
 */
@Component
@DependsOn("CouchDbConnector")
public class SofaRepository extends CouchDbRepositorySupport<Sofa> {

    private final String[] arr = {"positive","neutral","negative"};
    @Autowired
    public SofaRepository( @Qualifier("CouchDbConnector")CouchDbConnector db) {
        super(Sofa.class, db);
        try{
            initStandardDesignDocument();
        }catch(Exception e){
            System.out.println(" no need to create");
        }

    }
    @View( name = "avg_sofa_size", map = "function(doc) {emit(doc.id,doc.location)}")
    public Object getAverageSofaSize() {
        ViewResult r = db.queryView(createQuery("avg_sofa_size"));
        return r.getRows().get(0).getValueAsInt();
    }


    @View(name="by_location",map = "function(doc){emit(doc.location,1)}",reduce = "function(key,values){return values.length}")
    public int findByLocation(String location) {

        ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_location").key(location).reduce(true);
        ViewResult r = db.queryView(query);
        if(!r.isEmpty()&&r.iterator().hasNext()){
            return Integer.valueOf(r.iterator().next().getValue());
        }
        return 0;


    }

    @View(name="by_location_keyword", map = "function(doc){" +
            "var key = doc.location+doc.keyword+doc.sentiment; emit(key,1)}",reduce = "function(key,values){return values.length}")
    public Map<String,Integer> findByKeywordAndLocation(String location,String keyword){
        Map<String,Integer> resMap = new HashMap<>();
        for(String sentiment:arr){
            String keyName = location+keyword+sentiment;
            ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_location_keyword").key(keyName).reduce(true);
            ViewResult r = db.queryView(query);
            resMap.put(location+keyword+sentiment,r.getRows().size());
        }
        return resMap;

    }


    @GenerateView
    public List<Sofa> findByUsername(String username) {
        return queryView("by_username", username);
    }


}
