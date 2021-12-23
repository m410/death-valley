import com.github.gradle.node.npm.task.NpmTask

plugins {
  id("com.github.node-gradle.node") version "3.4.0"
}

node {
  version.set("16.13.1")
  download.set(true)
}

defaultTasks("build")

tasks {
  register<NpmTask>("build") {
    args.set(listOf("run", "build:prod"))
  }

  register<NpmTask>("run") {
    args.set(listOf("run", "start:demo"))
  }
}
