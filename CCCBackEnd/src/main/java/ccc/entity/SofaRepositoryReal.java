package ccc.entity;

import ccc.pojo.Sofa;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.ektorp.support.CouchDbRepositorySupport;
import org.ektorp.support.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by sumengzhang on 5/21/21 9:28 AM
 */
@Component
@DependsOn("CouchDbConnectorReal")
public class SofaRepositoryReal extends CouchDbRepositorySupport<Sofa> {
    @Autowired
    public SofaRepositoryReal( @Qualifier("CouchDbConnectorReal") CouchDbConnector db) {
        super(Sofa.class, db);
        try{
            initStandardDesignDocument();
        }catch(Exception e){
            System.out.println(" no need to create");
        }

    }

    @View(name = "by_realtime", map = "function(doc){emit(doc.created_at,1)}",reduce = "function(key,values){return sum(values)}")
    public Map<String, Integer> getRealTimeTweetsCount() {
        // Get current time
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd-HH");
        df.setTimeZone(TimeZone.getTimeZone("Australia/Melbourne"));
        String curDate = df.format(new Date());
        String []arr = curDate.split("-");
        String createdAtDate = arr[0];
        int hour = Integer.parseInt(arr[1]);
        // Get yesterday date
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar cal = Calendar.getInstance();
        cal.setTimeZone(TimeZone.getTimeZone("Australia/Melbourne"));
        int day = cal.get(Calendar.DATE);
        cal.set(Calendar.DATE, day-1);
        String lastDay = sdf.format(cal.getTime());

        Map<String,Integer> resMap = new HashMap<>();
        for(int i = 0;i<24;i++){
            resMap.put(""+i,0);
            String keyName = "";
            if(i<12){
                int curTime  = i+12;
                keyName = lastDay+curTime;

            }else{
                int curTime = i-12;
                if(curTime<10){
                    keyName = createdAtDate+"0"+curTime;
                }else{
                    keyName = createdAtDate+curTime;
                }
            }

            ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_realtime").key(keyName).reduce(true);
            ViewResult r = db.queryView(query);
            if(!r.isEmpty()&&r.iterator().hasNext()){
                resMap.put(""+(i-2),Integer.valueOf(r.iterator().next().getValue()));
            }
        }
        return resMap;


    }
}
