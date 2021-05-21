package ccc.entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by sumengzhang on 5/6/21 11:20 PM
 */

@Component
public class CouchDbInfo {
    @Value(value = "${couchdb.host}")
    private String host;
    @Value(value  = "${couchdb.port}")
    private String port;
    @Value(value  = "${couchdb.database}")
    private String database;
    @Value(value = "${couchdb.username}")
    private String username;
    @Value(value = "${couchdb.password}")
    private String password;
    @Value(value = "${couchdb.database.real}")
    private String databaseReal;

    public String getDatabaseReal() {
        return databaseReal;
    }

    public void setDatabaseReal(String databaseReal) {
        this.databaseReal = databaseReal;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
