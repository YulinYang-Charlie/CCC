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

/**
 * Created by sumengzhang on 5/21/21 12:25 AM
 */
@Configuration
public class CouchDbConfigReal {
    @Autowired
    private CouchDbInfo couchDBInfo;

    @Bean(name = "CouchDbConnectorReal")
    public CouchDbConnector couchDbConnectorReal() throws Exception {
        System.out.println("Begin to connect Realtime couchdb: "+couchDBInfo.getHost()+"......");
        HttpClient httpClient = new StdHttpClient.Builder().url(couchDBInfo.getHost() + ":"+ couchDBInfo.getPort())
                .username(couchDBInfo.getUsername()).connectionTimeout(10000).socketTimeout(1000000)
                .password(couchDBInfo.getPassword()).build();
        CouchDbInstance couchDbInstance = new StdCouchDbInstance(httpClient);
        CouchDbConnector couchDbConnector = new StdCouchDbConnector(couchDBInfo.getDatabaseReal(), couchDbInstance);
        couchDbConnector.createDatabaseIfNotExists();
        System.out.println("Connect Realtime database successfully"+couchDBInfo.getHost());
        return couchDbConnector;
    }
}
