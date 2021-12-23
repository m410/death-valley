# Death Valley
Why death valley? Because it's DRY. One area of web development where there is a lot of code
duplication is the server-side and client-side form validation. You have to do both. Instead
of writing the same form validation twice, this library makes it easy to use the server-side
validation and apply them to the angular form client-side.  With Java Beans using
javax.validations (or jakata.validations) and apply them client-side. 

Right once, validate twice.


## Configuration
### Java server setup
 - Include the library
     ```
     dependencies {
       implementation("us.m410:deathvalley:1.0.0")
     }
     ```
 - Initialize the service with spring-boot
    ```java
    @Configuration
    public class Config {
      @Bean
      ValidationService validationService() {
        return ValidationService.builder()
          .register(com.company.domain.Pojo.class)
          .make();
      }
    }
    ```
 - Create the controller
     ```java
     @RestController
     @RequestMapping("api/endpoints")
     final class MyController {
         private final ValidationInfoService validationInfoService;
         
         MyController(ValidationInfoService validationInfoService) {
             this.validationInfoService = validationInfoService;
         }
         @GetMapping(params = "validation")
         EntityConstraints validation() {
             return validationInfoService.forClass(Pojo.class);
         }
     }
     ```
 
### Angular client setup
 - install the module
 - add to app module imports
    ```typescript
       import {BrowserModule} from '@angular/platform-browser';
       import {NgModule} from '@angular/core';
       
       import {FormComponent} from './convoluted/form/form.component';
       import {FormsModule, ReactiveFormsModule} from '@angular/forms';
       import {DeathValleyModule} from '@m410/death-valley';
       import {HttpClientModule} from "@angular/common/http";
       
       @NgModule({
         declarations: [
           FormComponent,
         ],
         imports: [
           BrowserModule,
           DeathValleyModule,
           FormsModule,
           ReactiveFormsModule,
         ],
       })
       export class AppModule {
       }
   ```
 - use in your forms
     ```typescript
        @Component({
          selector: 'ex-form',
          templateUrl: './form.component.html',
        })
        export class FormComponent implements OnInit {
          constructor(
            private service: MyService,
            private validator: ValidatorService) {
          }
          ngOnInit() {
             this.validator.builder(this.service.validations()).applyTo(this.form);
          }
        }
     ```
 
## Running the examples
Once you clone the project, run:
```bash
./gradlew  :ng:run
```
in a different terminal, run the server
```bash
./gradlew  :java:demo-server:bootRun
```
then open a browser to http://localhost:4200/
