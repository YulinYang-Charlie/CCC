package ccc.config;

import ccc.entity.CouchDbInfo;
import org.ektorp.CouchDbConnector;
import org.ektorp.CouchDbInstance;
import org.ektorp.http.HttpClient;
import org.ektorp.http.StdHttpClient;
import org.ektorp.impl.StdCouchDbConnector;
import org.ektorp.impl.StdCouchDbInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Created by sumengzhang on 4/20/21 11:55 PM
 */

@Configuration
public class CouchDBConfig {

    @Autowired
    private CouchDbInfo couchDBInfo;

    @Bean(name = "CouchDbConnector")
    @Primary
    public CouchDbConnector couchDbConnector() throws Exception {
        System.out.println("Begin to connect couchdb: "+couchDBInfo.getHost()+"......");
        HttpClient httpClient = new StdHttpClient.Builder().url(couchDBInfo.getHost() + ":"+ couchDBInfo.getPort())
                .username(couchDBInfo.getUsername()).connectionTimeout(10000).socketTimeout(1000000)
                .password(couchDBInfo.getPassword()).build();
        CouchDbInstance couchDbInstance = new StdCouchDbInstance(httpClient);
        CouchDbConnector couchDbConnector = new StdCouchDbConnector(couchDBInfo.getDatabase(), couchDbInstance);
        couchDbConnector.createDatabaseIfNotExists();
        System.out.println("Connect database successfully"+couchDBInfo.getHost());
        return couchDbConnector;
    }







}
