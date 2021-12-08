# Death Valley DRY Java Library for UI validation in Angular

There are two parts, this is the server side part that generates angular validations.


add to gradle project
```groovy
dependencies {
    compile ''
}

```

## Spring
add service
```java
@Configuratoin
class ValidationConfig {
    @Bean
    DeathValleService deathValleService() {
        return new DeathValleyService();
    }
}

```

add controller
```java


```