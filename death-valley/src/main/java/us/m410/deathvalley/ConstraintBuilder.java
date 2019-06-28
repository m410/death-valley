package us.m410.deathvalley;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.lang.annotation.Annotation;
import java.util.Objects;
import java.util.function.Function;

public final class ConstraintBuilder<T> {
    private final String annotationName;
    private final Function<T, Constraint> builder;
    private final Class<T> clazz;

    ConstraintBuilder(Class<T> clazz, Function<T, Constraint> builder) {
        this.annotationName = clazz.getName();
        this.builder = builder;
        this.clazz = clazz;
    }

    Constraint toConstraint(Annotation t) {
        return builder.apply(clazz.cast(t));
    }

    String getAnnotationName() {
        return clazz.getName();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ConstraintBuilder<?> that = (ConstraintBuilder<?>) o;

        return Objects.equals(annotationName, that.annotationName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(annotationName);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("annotationName", annotationName)
                .toString();
    }
}