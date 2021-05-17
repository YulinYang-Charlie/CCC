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

import java.util.List;

/**
 * Created by sumengzhang on 5/15/21 12:07 AM
 */
@Component
@DependsOn("CouchDbConnector")
public class SofaRepository extends CouchDbRepositorySupport<Sofa> {


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


    @View(name="by_location",map = "function(doc){emit(doc.location,doc.username)}")
    public int findByLocation(String location) {
        ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_location").key(location);
        ViewResult r = db.queryView(query);
        // 尝试得到 location的数量，但是这样写效率低
        return r.getRows().size();

    }


    @GenerateView
    public List<Sofa> findByUsername(String username) {
        return queryView("by_username", username);
    }


}
