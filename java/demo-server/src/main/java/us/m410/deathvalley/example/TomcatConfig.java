package us.m410.deathvalley.example;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.LifecycleState;
import org.apache.catalina.valves.rewrite.RewriteValve;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Configuration
class TomcatConfig {

  private final RewriteValve rewriteValve = new RewriteValve() {
    @Override
    protected synchronized void startInternal() throws LifecycleException {
      setState(LifecycleState.STARTING);
      String path = "config/rewrite.config";
      InputStream configStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(path);

      if(configStream == null) {
        throw new RuntimeException("Could find resources at: " + path);
      }

      try (InputStreamReader isr = new InputStreamReader(configStream, StandardCharsets.UTF_8);
           BufferedReader reader = new BufferedReader(isr)) {
        parse(reader);
      } catch (IOException ioe) {
        containerLog.error(sm.getString("rewriteValve.closeError"), ioe);
      } finally {
        try {
          configStream.close();
        } catch (IOException e) {
          containerLog.error(sm.getString("rewriteValve.closeError"), e);
        }
      }
    }
  };

  @Bean
  ServletWebServerFactory servletContainer() {
    TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
    tomcat.addContextValves(rewriteValve);
    return tomcat;
  }

}
