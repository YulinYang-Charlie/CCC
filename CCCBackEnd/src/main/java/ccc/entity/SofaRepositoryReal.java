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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by sumengzhang on 5/21/21 9:28 AM
 */
@Component
@DependsOn("CouchDbConnectorReal")
public class SofaRepositoryReal extends CouchDbRepositorySupport<Sofa> {

    private static final String[] weekDays = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

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
//            if(todayTime>=0){
//                int key = todayTime--;
//
//                if(key<10){
//                    finalMap.put(createdAtDate+"-0"+key,resMap.get(""+i));
//                }else{
//                    finalMap.put(createdAtDate+"-"+key,resMap.get(""+i));
//                }
//
//            }else{
//                int key = i+hour+1;


                if(i<10){
                    finalMap.put(lastDate+"-0"+i,resMap.get(""+i));
                }else{
                    finalMap.put(lastDate+"-"+i,resMap.get(""+i));
                }
            //}

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



    @View(name = "by_week",map = "function(doc){emit(doc.created_at,1)}")
    public Map<String, Map<String, Integer>> getRealTimeByWeekdays() {

        ViewQuery query = new ViewQuery().designDocId("_design/Sofa").viewName("by_week");
        Map<String,Map<String,Integer>> resMap = new HashMap<>();
        List<ViewResult.Row> rows = db.queryView(query).getRows();

        for(String day:weekDays){
            Map<String,Integer> map = new HashMap<>();
            for(int i = 0;i<=23;i++){
                map.put(i<10?"0"+i:""+i,0);
            }
            resMap.put(day,map);
        }
        for(ViewResult.Row row:rows){
            String key = row.getKey();
            // 2021052015
            String date = key.substring(0,8);
            String time = key.substring(8,10);
            String weekday = dateToWeek(date);
            Map<String,Integer> curMap = resMap.get(weekday);
            curMap.put(time,curMap.getOrDefault((time),0)+1);
            resMap.put(weekday,curMap);

        }

        return resMap;


    }

    public static String dateToWeek(String dateStr) {
        String year = dateStr.substring(0,4);
        String month = dateStr.substring(4,6);
        String day = dateStr.substring(6,8);
        String datetime = year+"-"+month+"-"+day;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        Date date;
        try {
            date = sdf.parse(datetime);
            cal.setTime(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        return weekDays[w];
    }
}
