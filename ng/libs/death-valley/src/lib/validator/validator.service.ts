import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JAVAX_CONSTRAINT_FACTORIES} from '../javax/javax-validations';
import {BeanConstraintBuilder} from "./bean-constraint-validator";
import {FormControlConstraintFactory} from "./form-control-constraint-factory";
import {EntityConstraints} from "./entity-constraints";

@Injectable()
export class ValidatorService {
  constraintFactories = JAVAX_CONSTRAINT_FACTORIES;

  builder(data: Observable<EntityConstraints>) {
    return new BeanConstraintBuilder(data, this.constraintFactories);
  }

  addConstraintFactory<T>(constraint: FormControlConstraintFactory) {
    this.constraintFactories.push(constraint);
  }
}

