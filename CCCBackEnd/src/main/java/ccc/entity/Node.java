package ccc.entity;

import java.util.List;

/**
 * Created by sumengzhang on 5/19/21 1:55 PM
 */
public class Node {
    private String id;
    private String key;
    private List<String> values;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public List<String> getValues() {
        return values;
    }

    public void setValues(List<String> values) {
        this.values = values;
    }
}
