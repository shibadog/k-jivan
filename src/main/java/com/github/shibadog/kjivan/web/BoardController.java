package com.github.shibadog.kjivan.web;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.github.shibadog.kjivan.domain.TopicsService;
import com.github.shibadog.kjivan.domain.entity.Thread;
import com.github.shibadog.kjivan.web.form.CreateTopicForm;

import org.springframework.core.Conventions;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ClassUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class BoardController {
    private final TopicsService topicsService;

    public BoardController(TopicsService topicsService) {
        this.topicsService = topicsService;
    }

    @GetMapping({ "/", "" })
    public String index(Model model) {
        model.addAttribute("topics", topicsService.fetchTopics());

        boolean hasError = true;
        if (!model.containsAttribute(ClassUtils.getShortNameAsProperty(CreateTopicForm.class))) {
            model.addAttribute("createTopicForm", new CreateTopicForm(null, null));
            hasError = false;
        }
        model.addAttribute("hasError", hasError);
        log.info("{}", model);
        return "index";
    }

    @PostMapping("/createTopic")
    public String createTopic(@Validated CreateTopicForm form, BindingResult result, RedirectAttributes redirectAttributes) {
        if (!result.hasErrors()) {
            topicsService.createTopic(form);
        } else {
            redirectAttributes.addFlashAttribute(form);
            redirectAttributes.addFlashAttribute(BindingResult.MODEL_KEY_PREFIX + Conventions.getVariableName(form), result);
        }
        return "redirect:/";
    }

    @GetMapping("/topics/{topicId}")
    public String topic(Model model) {
        model.addAttribute("threads",
                List.of(new Thread(UUID.randomUUID(), "すれっどだよ", "せつめいだよ", LocalDateTime.now(), UUID.randomUUID())));
        return "topics";
    }
}