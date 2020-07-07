import com.github.gradle.node.npm.task.NpmTask

plugins {
  id("com.github.node-gradle.node") version "3.1.0"
}

node {
  version.set("14.17.3")
  download.set(true)
}

defaultTasks("build")

tasks {
  register<NpmTask>("build") {
    args.set(listOf("run", "build"))
  }

  register<NpmTask>("package") {
    args.set(listOf("run", "package"))
  }
}
