import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.moowork.node") version "1.3.1"
}

node {
    version = "10.15.3"
    download = true
}

defaultTasks("build")

tasks {
    register<NpmTask>("build") {
        setArgs(listOf("run-script","build"))
    }
    
    register<Task>("clean") {

    }
}
