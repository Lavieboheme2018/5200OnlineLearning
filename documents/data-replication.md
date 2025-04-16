# MongoDB Atlas Replica Set Bonus Report

This document describes the replication setup, observations, and benefits of using a **MongoDB Replica Set** in the context of our ULearn application. This report is created to fulfill the requirements of **Bonus Task 7: Replication** for Milestone 3.

---

## ✅ Overview

We deployed our backend MongoDB database on **MongoDB Atlas**, using the default **M0 Sandbox (Shared Tier)**. Atlas automatically provisions a **3-node replica set** that includes:
- 1 Primary node
- 2 Secondary nodes

This architecture provides high availability and fault tolerance without any manual configuration.

---

## 🔧 Replica Set Member Snapshot

> Atlas Cluster Node List
> <img width="1470" alt="Screenshot 2025-04-15 at 22 49 30" src="https://github.com/user-attachments/assets/466d5538-65c8-4c4b-a7d6-4f0bcb22b53f" />

Our cluster includes the following nodes:
- `ac-z9knfpt-shard-00-00`: Secondary
- `ac-z9knfpt-shard-00-01`: Primary
- `ac-z9knfpt-shard-00-02`: Secondary

All nodes are hosted in the same region (us-east-1) and are monitored through the Atlas dashboard.

---

## 🛠️ Replication Verification

> Output of `rs.status()`
> <img width="1470" alt="Screenshot 2025-04-15 at 23 08 37" src="https://github.com/user-attachments/assets/9a1f0aeb-6b20-40fe-a606-36b685fa89de" />
> <img width="1470" alt="Screenshot 2025-04-15 at 23 08 50" src="https://github.com/user-attachments/assets/4246e4d7-ca8a-40ff-8ec5-1f103f8ccd4f" />
> <img width="1470" alt="Screenshot 2025-04-15 at 23 09 00" src="https://github.com/user-attachments/assets/81835e4d-451f-4b92-89ca-1a1f23da104a" />


We connected to the cluster using the MongoDB shell and executed: rs.status()
The result confirmed:

- ✅ The **primary node** is healthy (`stateStr: "PRIMARY"`)
- ✅ The **two secondary nodes** are synced (`stateStr: "SECONDARY"`)
- ✅ Replication state is `ok: 1`, indicating a stable replica set

This verifies that the data is replicated correctly across all nodes.

---

##  Step Down Limitation (Why Manual Failover Is Not Shown)

⚠️ MongoDB Atlas **M0 clusters** do **not support manual step-down operations**.

- Atlas restricts direct administrative commands such as `rs.stepDown()` or replica set configuration changes in **Shared Tier clusters (M0/M2/M5)**.
- Therefore, we **cannot manually simulate a primary failure**.
- However, we acknowledge that **Atlas handles automatic failover internally**.

---

## 📦 What Gets Replicated?

All **write operations** to the primary node (e.g., course creation, student registration, assignment submission) are:

- Logged in the **oplog (operation log)**
- **Replicated to secondary nodes** in near real-time
- Reads can optionally be directed to secondaries (read preference)

This ensures **full data redundancy and durability**.

---

## 🔁 Automatic Failover

If the **primary node becomes unreachable** (due to crash, maintenance, or network failure), the replica set will:

1. **Elect a new primary automatically**
2. **Promote one of the secondary nodes**
3. **Restore write availability within seconds**

This process:
- Happens without any developer intervention
- Is built into MongoDB’s **replica set consensus algorithm** (Raft-like)

---

## 🎯 Benefits of Using Replica Sets

- ✅ **High Availability**  
  Automatically recovers from node failures by promoting a new primary.

- ✅ **Data Redundancy**  
  Protects against data loss by maintaining full copies of data on multiple nodes.

- ✅ **Read Scalability**  
  Supports optional read distribution across secondaries to reduce primary load.

- ✅ **Disaster Recovery**  
  With backups or secondaries in different regions, replica sets help restore services quickly.

---

## 📌 Summary

| Feature              | Our Setup in Atlas              |
|----------------------|----------------------------------|
| Replica Set Enabled  | ✅ Yes (3-node RS)               |
| `rs.status()` Checked| ✅ Confirmed primary + 2 secondaries |
| Manual Step Down     | ❌ Not supported in M0           |
| Sync Functionality   | ✅ Oplog-based real-time sync    |
| Automatic Failover   | ✅ Supported by Atlas            |

---

