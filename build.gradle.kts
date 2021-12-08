defaultTasks("build")

tasks {
  register("build") {
    dependsOn(
      ":death-valley:build",
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
    dependsOn(":death-valley:ruh")
    dependsOn(":java:demo-server:bootRun")
  }
}
