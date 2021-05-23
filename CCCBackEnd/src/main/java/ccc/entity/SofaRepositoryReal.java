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
        cal.set(Calendar.DATE, day-2);
        String lastDay = sdf.format(cal.getTime());
        cal.set(Calendar.DATE, day-1);
        String lastDate = sdf.format(cal.getTime());

        Map<String,Integer> resMap = new LinkedHashMap<>();
        String keyName = "";
        for(int i = 0;i<24;i++){
              keyName = lastDay;
            if(i<10){
                keyName  = keyName+"0"+i;
            }else{
                keyName = keyName+i;
            }

            ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_realtime").key(keyName).reduce(true);
            ViewResult r = db.queryView(query);
            if(!r.isEmpty()&&r.iterator().hasNext()){

                resMap.put(""+i,Integer.valueOf(r.iterator().next().getValue()));
            }else{
                resMap.put(""+i,0);
            }

        }
        Map<String,Integer> finalMap = new LinkedHashMap<>();
        int todayTime = hour;
        createdAtDate = createdAtDate.substring(4,8);
        lastDate = lastDate.substring(4,8);
        for(int i = 23;i>=0;i--){
            if(todayTime>=0){
                int key = todayTime--;

                if(key<10){
                    finalMap.put(createdAtDate+"-0"+key,resMap.get(""+i));
                }else{
                    finalMap.put(createdAtDate+"-"+key,resMap.get(""+i));
                }

            }else{
                int key = i+hour+1;


                if(key<10){
                    finalMap.put(lastDate+"-0"+key,resMap.get(""+i));
                }else{
                    finalMap.put(lastDate+"-"+key,resMap.get(""+i));
                }
            }

        }
        return finalMap;
//        for(int i = 0;i<hour;i++){
//           keyName  = createdAtDate;
//            if(i<10){
//                keyName  = keyName+"0"+i;
//            }else{
//                keyName = keyName+i;
//            }
//
//            ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_realtime").key(keyName).reduce(true);
//            ViewResult r = db.queryView(query);
//            if(!r.isEmpty()&&r.iterator().hasNext()){
//                if(i<10){
//                    createdAtDate = createdAtDate+"0";
//                }
//                resMap.put(createdAtDate+""+i,Integer.valueOf(r.iterator().next().getValue()));
//            }
//        }



    }
}
