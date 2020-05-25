package com.github.shibadog.springbootsession.domain.entity;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import lombok.Data;

@Data
public class Topic {
    private final UUID id;
    private final String name;
    private final LocalDateTime created;
    private final Set<String> tags;
}