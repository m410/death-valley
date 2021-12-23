defaultTasks("build")

tasks {
  register("build") {
    dependsOn(
      ":ng:build",
      ":java:death-valley:build",
      ":java:demo-server:build",
    )
  }

  register("clean") {
    dependsOn(
      ":java:death-valley:clean",
      ":java:demo-server:clean",
    )
  }
}
