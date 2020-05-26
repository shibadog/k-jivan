package com.github.shibadog.kjivan.web.form;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class CreateTopicForm {
    @NotEmpty
    private final String name;
    private final String description;
}