
plugins {
  id("org.springframework.boot") version "2.5.3"
  id("io.spring.dependency-management") version "1.0.11.RELEASE"
  id("java")
}

group = "us.m410.deathvalley.example"
version = "0.1.0-SNAPSHOT"

repositories {
  mavenCentral()
  mavenLocal()
}


dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation(project(":death-valley"))
  implementation("com.h2database:h2:1.4.197")

  implementation("javax.xml.bind:jaxb-api:2.3.0")
  implementation("com.sun.xml.bind:jaxb-core:2.3.0")

  compileOnly("org.projectlombok:lombok:1.18.20")
  annotationProcessor("org.projectlombok:lombok:1.18.20")

  testCompileOnly("org.projectlombok:lombok:1.18.20")
  testAnnotationProcessor("org.projectlombok:lombok:1.18.20")

  developmentOnly("org.springframework.boot:spring-boot-devtools")

  testImplementation("org.springframework.boot:spring-boot-starter-test") {
    exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
  }
}

java {
  sourceCompatibility = JavaVersion.VERSION_15
}

tasks {
  named<Test>("test") {
    useJUnitPlatform()
  }
}
