package ccc.entity;

import ccc.pojo.Sofa;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewResult;
import org.ektorp.support.CouchDbRepositorySupport;
import org.ektorp.support.GenerateView;
import org.ektorp.support.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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


    @GenerateView
    public List<Sofa> findByLocation(String location) {
        ViewResult r = db.queryView(createQuery("by_location"));
        return new ArrayList<>();
    }


    @GenerateView
    public List<Sofa> findByUsername(String username) {
        return queryView("by_username", username);
    }


}
