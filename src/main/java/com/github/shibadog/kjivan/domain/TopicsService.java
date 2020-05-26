package com.github.shibadog.kjivan.domain;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.github.shibadog.kjivan.domain.entity.Topic;
import com.github.shibadog.kjivan.web.form.CreateTopicForm;

import org.springframework.stereotype.Service;

@Service
public class TopicsService {
    private final List<Topic> topics = new LinkedList<Topic>();
    
    public Collection<Topic> fetchTopics() {
        return topics;
    }

    public void createTopic(CreateTopicForm form) {
        Topic topic = new Topic(UUID.randomUUID(), form.getName(), form.getDescription(), LocalDateTime.now(), Set.of());
        topics.add(topic);
    }
}