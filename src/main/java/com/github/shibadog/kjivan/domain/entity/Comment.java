package com.github.shibadog.kjivan.domain.entity;

import lombok.Data;

@Data
public class Comment {
    private final int id;
    private final String content;
    private final int threadId;
}