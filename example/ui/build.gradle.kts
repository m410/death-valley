import com.moowork.gradle.node.npm.NpmTask

plugins {
  id("com.github.node-gradle.node") version "2.2.4"
}

node {
  version = "10.21.0"
  download = true
}

defaultTasks("build")

tasks {

  register<NpmTask>("build") {
    setArgs(listOf("run-script", "build"))
  }
}
