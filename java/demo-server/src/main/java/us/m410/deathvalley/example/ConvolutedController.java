package us.m410.deathvalley.example;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import us.m410.deathvalley.EntityConstraints;
import us.m410.deathvalley.ValidationInfoService;

import javax.validation.Valid;

@RestController
@RequestMapping("api/convoluted")
final class ConvolutedController {
    private final ConvolutedRepository convolutedRepository;
    private final ValidationInfoService validationInfoService;

    ConvolutedController(ConvolutedRepository convolutedRepository, ValidationInfoService validationInfoService) {
        this.convolutedRepository = convolutedRepository;
        this.validationInfoService = validationInfoService;
    }

    @GetMapping
    Page<Convoluted> list(Pageable page) {
        return convolutedRepository.findAll(page);
    }

    @GetMapping(params = "validation")
    EntityConstraints validation() {
        return validationInfoService.forClass(Convoluted.class);
    }

    @GetMapping(params = "statuses")
    Convoluted.Status[] statuses() {
        return Convoluted.Status.values();
    }

    @PostMapping
    Convoluted create(@Valid @RequestBody Convoluted c) {
        return convolutedRepository.save(c);
    }

    @GetMapping("{id}")
    Convoluted read(@PathVariable Long id) {
        return convolutedRepository.findById(id).orElseThrow(() -> new RuntimeException("No id:" + id));
    }

    @PutMapping("{id}")
    Convoluted update(@PathVariable Long id, @Valid @RequestBody Convoluted c) {
        return convolutedRepository.save(c);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable Long id) {
        convolutedRepository.deleteById(id);
    }
}
