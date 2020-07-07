import com.github.gradle.node.npm.task.NpmTask

plugins {
  id("com.github.node-gradle.node") version "3.1.0"
}

node {
  version.set("14.17.4")
  download.set(true)
}

defaultTasks("build")

tasks {
  register<NpmTask>("build") {
    args.set(listOf("run-script", "build"))
  }
}
