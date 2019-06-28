package us.m410.deathvalley.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import us.m410.deathvalley.ValidationInfoService;
import us.m410.deathvalley.ValidationInfoServiceImpl;

@Configuration
public class DeathValleyConfig {

    @Bean
    public ValidationInfoService deathValleyService() {
        return new ValidationInfoServiceImpl();
    }
}
