defaultTasks("build")

tasks {
  register("build") {
    dependsOn(
      ":angular:build",
      ":java:death-valley:build",
      ":java:demo-server:build",
    )
  }

  register("clean") {
    dependsOn(
      ":java::death-valley:clean",
      ":java::demo-server:clean",
    )
  }

  register("runExample") {
    dependsOn(":angular:run")
    dependsOn(":java:demo-server:bootRun")
  }
}
