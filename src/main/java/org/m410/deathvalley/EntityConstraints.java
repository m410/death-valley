package org.m410.deathvalley;

import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

public final class EntityConstraints implements Comparable<EntityConstraints> {
    private final String className;
    private final Set<FieldConstraints> fields = new TreeSet<>();

    EntityConstraints(String className) {
        this.className = className;
    }

    void add(FieldConstraints fieldInfo) {
        this.fields.add(fieldInfo);
    }

    public String getClassName() {
        return className;
    }

    public Set<FieldConstraints> getFields() {
        return fields;
    }

    @Override
    public int compareTo(EntityConstraints that) {
        return this.className.compareTo(that.className);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EntityConstraints that = (EntityConstraints) o;
        return Objects.equals(className, that.className);
    }

    @Override
    public int hashCode() {
        return Objects.hash(className);
    }
}
