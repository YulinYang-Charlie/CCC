import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by sumengzhang on 5/21/21 10:46 AM
 */
public class Demo {
    @Test
    public void test01(){
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
        System.out.println(createdAtDate);
        System.out.println(lastDay);

    }
}
