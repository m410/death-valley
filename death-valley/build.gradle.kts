plugins {
  id("java-library")
  id("maven-publish")
  id("idea")
}

version = "1.0.0-SNAPSHOT"
group = "us.m410.deathvalley"

defaultTasks("build")


repositories {
  mavenCentral()
}

dependencies {
  api("org.apache.commons:commons-lang3:3.7")
  api("javax.validation:validation-api:2.0.1.Final")

  testImplementation("javax.annotation:javax.annotation-api:1.3.2")
  testImplementation("org.hibernate.common:hibernate-commons-annotations:5.0.4.Final")
  testImplementation("org.hibernate.javax.persistence:hibernate-jpa-2.1-api:1.0.2.Final")

  testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.2")
  testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.7.2")
}

tasks {
  test {
    useJUnitPlatform {
      excludeEngines = setOf("junit-vintage")
    }
  }
  val sourcesJar by creating(Jar::class) {
    archiveClassifier.set("sources")
    from(sourceSets.main.get().allSource)
  }

  val javadocJar by creating(Jar::class) {
    dependsOn.add(javadoc)
    archiveClassifier.set("javadoc")
    from(javadoc)
  }

  artifacts {
    archives(sourcesJar)
    archives(javadocJar)
    archives(jar)
  }
}

java {
  sourceCompatibility = JavaVersion.VERSION_11
}


publishing {
  publications {
    create<MavenPublication>("myLibrary") {
      from(components["java"])
      artifact(tasks["sourcesJar"])
      artifact(tasks["javadocJar"])
      pom {
        name.set("Death Valley")
        description.set("Java server-side counterpart to ng-death-valley angular library to perform form validation.")
        url.set("https://gitlab.com/m410/death-valley")
        licenses {
          license {
            name.set("The Apache License, Version 2.0")
            url.set("http://www.apache.org/licenses/LICENSE-2.0.txt")
          }
        }
        developers {
          developer {
            id.set("michaelfortin")
            name.set("Michael Fortin")
            email.set("michael410@pm.me")
          }
        }
        scm {
          url.set("git@gitlab.com:m410/death-valley.git")
        }
      }
    }
  }
}
