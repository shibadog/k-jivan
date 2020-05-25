package com.github.shibadog.springbootsession.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;

@Data
public class Thread {
    private final UUID id;
    private final String name;
    private final String description;
    private final LocalDateTime created;
    private final UUID topicId;
}