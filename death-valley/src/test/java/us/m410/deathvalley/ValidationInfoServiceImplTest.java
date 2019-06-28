package us.m410.deathvalley;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidationInfoServiceImplTest {

    @Test
    void forClass() {
        ValidationInfoService validationInfoService = new ValidationInfoServiceImpl();
        EntityConstraints entityConstraints = validationInfoService.forClass(Bank.class);
        assertNotNull(entityConstraints);
        assertEquals(6, entityConstraints.getFields().size());
        Optional<FieldConstraints> name = entityConstraints.getFields().stream()
                .filter(fieldConstraints -> fieldConstraints.getName().equals("name"))
                .findFirst();
        assertTrue(name.isPresent());
        assertEquals(3, name.get().getConstraints().size());
    }
}