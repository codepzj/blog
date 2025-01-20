---
title: neo4j图数据库基本语法
tags: [neooj]
categories: [技术分享]
permalink: posts/24.html
excerpt: 本文讲述了neo4j图数据库的基本概念及增删改查，如增加节点，增加关系，修改节点属性，查询节点，删除节点特定属性等等
poster:
  topic: null
  headline: neo4j图数据库基本语法
  caption: null
  color: null
date: 2024-11-10 00:47:41
updated: 2024-11-10 00:47:41
topic:
banner:
references:
---

## neo4j 是什么

{% box %}
neo4j 是一种图数据库，属于非关系型数据库（nosql），常用于表示复杂的网络关系，知识图谱等等。
{% endbox %}

## neo4j 的增删改查

### 增加节点

```sql
create(n:Person{name:"pzj"})
```

### 增加关系

```sql
create(n:Person{name:"贾宝玉"})-[:表妹]->(m:Person{name:"林黛玉"})
```

### 修改节点属性

```sql
match (n:Person) where n.name='张三' set n.type='乐队' return n
```

### 查询节点

```sql
match(n:Person) where n.name="张三" return n
```

### 删除节点

```sql
match(n:Person) where n.name="张三" delete n
```

### 删除节点特定属性

```sql
match(n)where n.name="张三" remove n.type return n
```

### 删除节点及关系

```sql
match (n:Person)-[r]-() where n.name='张三' delete n,r
```

### 删除所有节点及关系

```sql
match (n) optional match (n)-[r]-() delete n,r
```
