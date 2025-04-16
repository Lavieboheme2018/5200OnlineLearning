# 📦 MongoDB Sharded Cluster Report (Bonus Task - Part B)

This document details the setup and configuration of a **MongoDB Sharded Cluster** for Bonus Task 7 - Part B, focusing on horizontal scaling and sharding techniques. The setup was implemented using **Docker** to simulate a real-world sharded architecture with minimal resources.

---

## ⚙️ Architecture Overview

We deployed a fully functional sharded cluster using Docker Compose, containing:

- **1 `mongos` (query router)**  
- **1 Config Server**  
- **2 Shard Servers (each with its own replica set)**

```plaintext
       +---------------------+
       |     mongos (router)|
       +---------------------+
                  |
   ---------------------------------
   |                               |
+----------+               +----------+
| shard1rs |               | shard2rs |
+----------+               +----------+
         \                 /
       +---------------------+
       | Config Server (cfgrs)|
       +---------------------+


## 🚀 Setup Steps

### ✅ Step 1: Start all containers

```bash
docker-compose up -d
```bash

### ✅ Step 2: Initialize Config Server Replica Set
```bash
docker exec -it sharded-cluster-docker-configsvr-1 mongosh
```bash

```bash
rs.initiate({
  _id: "cfgrs",
  configsvr: true,
  members: [{ _id: 0, host: "configsvr:27017" }]
});
```bash

### ✅ Step 3: Initialize Shard Replica Sets
shard1
```bash
docker exec -it sharded-cluster-docker-shard1-1 mongosh
```bash
```bash
rs.initiate({
  _id: "shard1rs",
  members: [{ _id: 0, host: "shard1:27018" }]
});
```bash

shard2
```bash
docker exec -it sharded-cluster-docker-shard2-1 mongosh
```bash
```bash
rs.initiate({
  _id: "shard2rs",
  members: [{ _id: 0, host: "shard2:27019" }]
});
```bash

### ✅ Step 4: Configure Shards in mongos
```bash
docker exec -it sharded-cluster-docker-mongos-1 mongosh
```bash
```bash
sh.addShard("shard1rs/shard1:27018")
sh.addShard("shard2rs/shard2:27019")
```bash

### 📌 Sharding Key and Collections

We enabled sharding for a custom database ulearn, with the following steps:

```bash
use ulearn
sh.enableSharding("ulearn")

db.createCollection("students")

// Set sharding key to hashed student_id
sh.shardCollection("ulearn.students", { student_id: "hashed" })
```bash
This ensures data will be distributed across shards based on the student_id field using a hashed sharding key, allowing near-uniform distribution.

### 🧭 Routing and Shard Verification
sh.status():


