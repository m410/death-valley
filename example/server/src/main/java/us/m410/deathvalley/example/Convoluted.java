package us.m410.deathvalley.example;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.*;

@Getter
@Setter
@Entity
public class Convoluted {

    @Id
    @GeneratedValue(generator = "convoluted_id_seq")
    @SequenceGenerator(name = "convoluted_id_seq", sequenceName = "convoluted_id_seq", allocationSize = 1)
    private Long id;

    @NotBlank(message = "Cannot be blank.")
    @Size(min = 3, max = 72, message = "Must be longer than 3 and shorter than 72.")
    @Pattern(regexp = "^[\\w\\s]+$", message = "No special characters allowed.")
    @Column(nullable = false, length = 72, unique = true)
    private String name;

    @Max(value = 10, message = "Can't be greater than 10")
    @Min(value = 1, message = "Must be more than one")
    private Integer largeNumber;

    @NotNull
    @Column(nullable = false)
    private Status status;

    public enum Status {
        Open,
        Closed,
        Inbetween
    }
}
