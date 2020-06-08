package com.github.shibadog.kjivan.web.form;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class CreateTopicForm {
    @NotEmpty
    @Length(max = 128)
    private final String name;
    private final String description;
}