package com.github.shibadog.springbootsession.domain.entity;

import lombok.Data;

@Data
public class Comment {
    private final int id;
    private final String content;
    private final int threadId;
}