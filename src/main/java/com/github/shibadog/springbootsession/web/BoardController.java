package com.github.shibadog.springbootsession.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
    @GetMapping({ "/", "" })
    public String index(Model model) {
        return "index";
    }
}