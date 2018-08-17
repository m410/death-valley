package org.m410.deathvalley;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Objects;

public final class Constraint implements Comparable<Constraint> {
    private final String name;
    private final String message;
    private final String regex;
    private final double min;
    private final double max;

    Constraint(String name) {
        this.name = name;
        message = "";
        regex = "";
        min = 0;
        max = 0;
    }

    Constraint(String name, String message) {
        this.name = name;
        this.message = message;
        regex = "";
        min = 0;
        max = 0;
    }

    Constraint(String name, String message, String regex) {
        this.name = name;
        this.message = message;
        this.regex = regex;
        min = 0;
        max = 0;
    }

    Constraint(String name, String message, double min, double max) {
        this.name = name;
        this.message = message;
        regex = "";
        this.min = min;
        this.max = max;
    }

    Constraint(String name, double min, double max) {
        this.name = name;
        this.message = "";
        regex = "";
        this.min = min;
        this.max = max;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }

    public String getRegex() {
        return regex;
    }

    public double getMin() {
        return min;
    }

    public double getMax() {
        return max;
    }

    @Override
    public int compareTo(Constraint that) {
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
        Constraint that = (Constraint) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
