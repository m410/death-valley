package org.m410.deathvalley;

import org.springframework.stereotype.Service;

import javax.validation.constraints.*;
import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Service
public class ValidationInfoServiceImpl implements ValidationInfoService {
    private final Set<EntityConstraints> set = new CopyOnWriteArraySet<>();
    private final Set<ConstraintBuilder<?>> constraintBuilders = Set.of(
            new ConstraintBuilder<>(AssertFalse.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(AssertTrue.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(DecimalMax.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(DecimalMin.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Digits.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Email.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Future.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(FutureOrPresent.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Max.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message(), 0, a.value())),
            new ConstraintBuilder<>(Min.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message(), a.value(), 0)),
            new ConstraintBuilder<>(Negative.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(NegativeOrZero.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(NotBlank.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(NotEmpty.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(NotNull.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Null.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Past.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(PastOrPresent.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Pattern.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message(), a.regexp())),
            new ConstraintBuilder<>(Positive.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(PositiveOrZero.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message())),
            new ConstraintBuilder<>(Size.class, a -> new Constraint(a.annotationType().getSimpleName(), a.message(), a.min(), a.max()))
    );

    @Override
    public EntityConstraints forClass(Class c) {
        return set.stream()
                .filter(it -> it.getClassName().equals(c.getName()))
                .findFirst()
                .orElse(newValidation(c));
    }

    public void addConstraintBuilder(ConstraintBuilder<?>... annotationClass) {
        constraintBuilders.addAll(List.of(annotationClass));
    }

    private EntityConstraints newValidation(Class targetClass) {
        final EntityConstraints entityConstraints = new EntityConstraints(targetClass.getName());
        final java.lang.reflect.Field[] declaredFields = targetClass.getDeclaredFields();

        for (java.lang.reflect.Field field : declaredFields) {
            Annotation[] declaredAnnotations = field.getDeclaredAnnotations();
            FieldConstraints fieldConstraints = new FieldConstraints(field.getName(), field.getType());

            if (!fieldConstraints.getName().startsWith("$$_")) { // hibernate marker
                entityConstraints.add(fieldConstraints);

                for (Annotation declaredAnnotation : declaredAnnotations) {
                    Class<? extends Annotation> annotationType = declaredAnnotation.annotationType();

                    constraintBuilders.stream()
                            .filter(it -> it.getAnnotationName().equals(annotationType.getName()))
                            .forEach(a -> fieldConstraints.add(a.toConstraint(declaredAnnotation)));
                }
            }
        }

        set.add(entityConstraints);
        return entityConstraints;
    }
}
