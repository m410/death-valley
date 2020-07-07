defaultTasks("build")

tasks {
  register("build") {
    dependsOn(
      ":death-valley:build",
      ":death-valley-ng:build",
      ":example:ui:build",
      ":example:ui:build"
    )
  }

  register("clean") {
    dependsOn(
      ":death-valley:clean",
      ":example:server:clean"
    )
  }

  register("runExample") {
    dependsOn(":example:server:bootRun")
  }
}
