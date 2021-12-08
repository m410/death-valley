import com.github.gradle.node.npm.task.NpmTask

plugins {
  id("com.github.node-gradle.node") version "3.1.1"
}

node {
  version.set("16.13.1")
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
