package org.m410.deathvalley;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ValidationInfoServiceTest {

    @Test
    void forClass() {
        ValidationInfoService service = new ValidationInfoServiceImpl();
        EntityConstraints result = service.forClass(Bank.class);
        assertNotNull(result);
        assertEquals(6, result.getFields().size());
    }
}