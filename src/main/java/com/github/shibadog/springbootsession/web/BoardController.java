package com.github.shibadog.springbootsession.web;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.github.shibadog.springbootsession.domain.entity.Thread;
import com.github.shibadog.springbootsession.domain.entity.Topic;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
    @GetMapping({ "/", "" })
    public String index(Model model) {
        model.addAttribute("topics",
                List.of(new Topic(UUID.randomUUID(), "トピック", LocalDateTime.now(), Set.of("たぐ１", "たぐ２"))));
        return "index";
    }

    @GetMapping("topics/{topicId}")
    public String topic(Model model) {
        model.addAttribute("threads",
                List.of(new Thread(UUID.randomUUID(), "すれっどだよ", "せつめいだよ", LocalDateTime.now(), UUID.randomUUID())));
        return "topics";
    }
}