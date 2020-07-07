
val projectVersion:String by project
val projectGroup:String by project

subprojects {
    version = projectVersion
    group = projectGroup
}

description = "Demo application"



