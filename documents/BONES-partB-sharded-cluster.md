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

```
## 🚀 Setup Steps

### ✅ Step 1: Start all containers

```bash
docker-compose up -d
```

### ✅ Step 2: Initialize Config Server Replica Set
```bash
docker exec -it sharded-cluster-docker-configsvr-1 mongosh
rs.initiate({
  _id: "cfgrs",
  configsvr: true,
  members: [{ _id: 0, host: "configsvr:27017" }]
});
```
<img width="847" alt="Screenshot 2025-04-15 at 23 47 15" src="https://github.com/user-attachments/assets/2a16ee5a-0660-408e-bc8f-e5dbcb5d4a3a" />

### ✅ Step 3: Initialize Shard Replica Sets
🔹 Shard 1
```bash
docker exec -it sharded-cluster-docker-shard1-1 mongosh
rs.initiate({
  _id: "shard1rs",
  members: [{ _id: 0, host: "shard1:27018" }]
});
```
<img width="833" alt="Screenshot 2025-04-15 at 23 47 41" src="https://github.com/user-attachments/assets/948e8ea7-8395-4992-a76d-73653cce514d" />

🔹 Shard 2
```bash
docker exec -it sharded-cluster-docker-shard2-1 mongosh
rs.initiate({
  _id: "shard2rs",
  members: [{ _id: 0, host: "shard2:27019" }]
});

```
<img width="839" alt="Screenshot 2025-04-15 at 23 48 10" src="https://github.com/user-attachments/assets/9d09dea8-b711-4f1d-92df-a67ecfd14304" />

### ✅ Step 4: Configure Shards in mongos
```bash
docker exec -it sharded-cluster-docker-mongos-1 mongosh
sh.addShard("shard1rs/shard1:27018")
sh.addShard("shard2rs/shard2:27019")
```

### 📌 Sharding Key and Collections

We enabled sharding for a custom database ulearn, with the following steps:
```bash
use ulearn
sh.enableSharding("ulearn")

db.createCollection("students")

// Set sharding key to hashed student_id
sh.shardCollection("ulearn.students", { student_id: "hashed" })
```
This ensures data will be distributed across shards based on the student_id field using a hashed sharding key, allowing near-uniform distribution.

### 🧭 Routing and Shard Verification

✅ View shard status:
sh.status()
This commands confirm:

All shards (shard1rs, shard2rs) have been added
ulearn.students collection is successfully sharded using { student_id: "hashed" }
Data is being routed via the mongos router
📸 Screenshot:
<img width="836" alt="Screenshot 2025-04-15 at 23 49 00" src="https://github.com/user-attachments/assets/85dc19f6-33a1-4bf3-82dc-a8f1692d1942" />
<img width="841" alt="Screenshot 2025-04-15 at 23 49 13" src="https://github.com/user-attachments/assets/63af0524-7050-48b8-9531-176fb5faf3f8" />





### 💡 Benefits of Sharding

Using sharding in MongoDB brings the following advantages:

✅ Write Scalability
Writes are distributed across multiple shard servers, reducing load on any single node.
✅ Big Data Support
Collections with millions of documents are automatically partitioned, allowing for efficient query and storage scaling.
✅ Elastic Growth
More shards can be added dynamically to handle future growth in data volume or user requests.
✅ Improved Performance
Indexed queries and balanced chunk distribution lead to better throughput for high-load systems.
