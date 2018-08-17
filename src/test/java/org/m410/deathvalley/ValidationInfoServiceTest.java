package org.m410.deathvalley;

import com.fiserv.cbs.ccs.bank.Bank;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ValidationInfoServiceTest {

    @Test
    void forClass() {
        ValidationInfoService service = new ValidationInfoServiceImpl();
        EntityConstraints result = service.forClass(Bank.class);
        assertNotNull(result);
        assertEquals(10, result.getFields().size());
    }
}