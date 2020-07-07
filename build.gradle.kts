defaultTasks("build")

tasks {
  register("build") {
    dependsOn(
      ":death-valley:build",
      ":death-valley-ng:build"
    )
  }

  register("clean") {
    dependsOn(
      ":death-valley:clean",
      ":death-valley-ng:clean"
    )
  }

  register("runExample") {
    dependsOn("build", ":example:server:bootRun")
  }
}
