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
    private final String[] locations= {"Victoria","New south wales","Queensland","Tasmania","Western australia","South australia","Northern territory"};
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


    @GenerateView
    public List<Sofa> findByLocation(String location) {
        return queryView("by_location", location);
    }

    @View(name="by_location_keyword", map = "function(doc){" +
            "var key = doc.location+doc.keyword+doc.sentiment; emit(key,1)}",reduce = "function(key,values){return sum(values)}")
    public Map<String,Map<String,Integer>> findByKeywordAndLocation(String keyword){
        // <Region,<Sentiment,counts>>
        Map<String,Map<String,Integer>> res = new HashMap<>();

        for(String location:locations){
            Map<String,Integer> resMap = new HashMap<>();
            for(String sentiment:arr){
                String keyName = location+keyword+sentiment;
                ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_location_keyword").key(keyName).reduce(true);
                ViewResult r =  db.queryView(query);
                if(!r.isEmpty()&&r.iterator().hasNext()){
                    resMap.put(sentiment,Integer.valueOf(r.iterator().next().getValue()));
                }
            }
            res.put(location,resMap);
        }

        return res;

    }

    @View(name = "by_date_keyword", map="function(doc){emit(doc.location+doc.created_at+doc.keyword+doc.sentiment,1)}",reduce="function(key,values){return sum(values)}")
    public Map<String,Map<String,Integer>> getTweetsCountByDateAndKeyword(String date,String keyword){
        Map<String,Map<String,Integer>> res = new HashMap<>();

        for(String location:locations) {
            Map<String,Integer> resMap = new HashMap<>();
            for(String sentiment:arr) {
                String keyName = location + date + keyword+sentiment;
                ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_date_keyword").key(keyName).reduce(true);
                ViewResult r = db.queryView(query);
                if(!r.isEmpty()&&r.iterator().hasNext()){
                    resMap.put(sentiment,Integer.valueOf(r.iterator().next().getValue()));
                }
            }
            res.put(location,resMap);
        }
        return res;
    }



    @GenerateView
    public List<Sofa> findByUsername(String username) {
        return queryView("by_username", username);

    }


}
