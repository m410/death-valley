package us.m410.deathvalley;


import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Cacheable
public class Bank  {

    @Id
    @GeneratedValue(generator = "bank_id_seq")
    @SequenceGenerator(name = "bank_id_seq", sequenceName = "bank_id_seq", allocationSize = 1)
    private Long id;

    // @CreatedDate
    // @Column(nullable = false, updatable = false)
    // protected LocalDateTime createdAt;

    // @CreatedBy
    // @Column(nullable = false, updatable = false)
    // protected String createdBy;

    // @LastModifiedDate
    // @Column(nullable = false)
    // protected LocalDateTime updatedAt;

    // @LastModifiedBy
    // @Column(nullable = false)
    // protected String updatedBy;

    
    @NotBlank(message = "Cannot be blank.")
    @Size(min = 3, max = 72, message = "Must be longer than 3 and shorter than 72.")
    @Pattern(regexp = "^[\\w\\s]+$", message = "No special characters allowed.")
    @Column(nullable = false, length = 72, unique = true)
    private String name;

    @NotNull(message = "Required field.")
    @NotBlank(message = "Cannot be blank.")
    @Size(min = 2, max = 36, message = "Must be 2 to 36 characters.")
    @Pattern(regexp = "^[\\w\\s]+$", message = "No special characters allowed.")
    @Column(length = 36, nullable = false, unique = true)
    private String domainName; 

    @Size(min = 3, max = 127, message = "Must be longer than 3 and shorter than 72.")
    @Pattern(regexp = "^[\\w\\s]+$", message = "No special characters allowed.")
    @Column(length = 127)
    private String alternateName;

    @NotNull(message = "Required field.")
    @Column(nullable = false)
    private DestinationSource destinationSource;

    @NotNull(message = "Required field.")
    @Column(nullable = false)
    private Status status = Status.Enabled;

    // @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // @PrimaryKeyJoinColumn
    // private BuildConfig buildConfig;

    // todo has companies that have browser users

    // todo apps & login page branding, css & images

    // todo destinations

    // @JsonIgnore
    // @ManyToOne(fetch = FetchType.LAZY)
    // private LeadBank leadBank; // optional

    // @JsonIgnore
    // @OneToMany(mappedBy = "bank", fetch = FetchType.LAZY)
    // private Collection<Company> companies; // todo remove, make unidirectional

    // @JsonIgnore
    // @OneToMany(mappedBy = "bank", fetch = FetchType.LAZY)
    // private Collection<BankSiteUser> users;

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("domainName", domainName)
                .append("name", name)
                .toString();
    }

    public enum DestinationSource {
        Self,
        ProxyToBank,
        None
    }

    public enum Status {
        Enabled,
        Setup,
        Disabled
    }
}
