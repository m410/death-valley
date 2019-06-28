package us.m410.deathvalley;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public final class FieldConstraints implements Comparable<FieldConstraints> {
    private final String name;
    private final Class type;
    private final Set<Constraint> constraints = new HashSet<>();

    FieldConstraints(String name, Class type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public Set<Constraint> getConstraints() {
        return constraints;
    }

    void add(Constraint constraint) {
        this.constraints.add(constraint);
    }

    @Override
    public int compareTo(FieldConstraints that) {
        return this.name.compareTo(that.name);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("name", name)
                .toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FieldConstraints fieldInfo = (FieldConstraints) o;
        return Objects.equals(name, fieldInfo.name) &&
                Objects.equals(constraints, fieldInfo.constraints);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, constraints);
    }
}
