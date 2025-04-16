## 1. Set Up Docker Network
command: docker network create mongo-cluster

## 2. Implement Replication
- Creating a replica set named rs0, including 1 primary and 2 secondaries:
docker run -d --name mongo-primary --net mongo-cluster -p 27017:27017 mongo --replSet rs0
docker run -d --name mongo-secondary1 --net mongo-cluster -p 27018:27017 mongo --replSet rs0
docker run -d --name mongo-secondary2 --net mongo-cluster -p 27019:27017 mongo --replSet rs0

- Initiating the replica set from inside the primary:
docker exec -it mongo-primary mongosh
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo-primary:27017" },
    { _id: 1, host: "mongo-secondary1:27017" },
    { _id: 2, host: "mongo-secondary2:27017" }
  ]
})

- rs.status():
{
  set: 'rs0',
  date: ISODate('2025-04-16T01:35:43.049Z'),
  myState: 1,
  term: Long('1'),
  syncSourceHost: '',
  syncSourceId: -1,
  heartbeatIntervalMillis: Long('2000'),
  majorityVoteCount: 2,
  writeMajorityCount: 2,
  votingMembersCount: 3,
  writableVotingMembersCount: 3,
  optimes: {
    lastCommittedOpTime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
    lastCommittedWallTime: ISODate('2025-04-16T01:35:28.443Z'),
    readConcernMajorityOpTime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
    appliedOpTime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
    durableOpTime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
    writtenOpTime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
    lastAppliedWallTime: ISODate('2025-04-16T01:35:28.443Z'),
    lastDurableWallTime: ISODate('2025-04-16T01:35:28.443Z'),
    lastWrittenWallTime: ISODate('2025-04-16T01:35:28.443Z')
  },
  lastStableRecoveryTimestamp: Timestamp({ t: 1744767318, i: 1 }),
  electionCandidateMetrics: {
    lastElectionReason: 'electionTimeout',
    lastElectionDate: ISODate('2025-04-16T01:35:28.378Z'),
    electionTerm: Long('1'),
    lastCommittedOpTimeAtElection: { ts: Timestamp({ t: 1744767318, i: 1 }), t: Long('-1') },
    lastSeenWrittenOpTimeAtElection: { ts: Timestamp({ t: 1744767318, i: 1 }), t: Long('-1') },
    lastSeenOpTimeAtElection: { ts: Timestamp({ t: 1744767318, i: 1 }), t: Long('-1') },
    numVotesNeeded: 2,
    priorityAtElection: 1,
    electionTimeoutMillis: Long('10000'),
    numCatchUpOps: Long('0'),
    newTermStartDate: ISODate('2025-04-16T01:35:28.413Z'),
    wMajorityWriteAvailabilityDate: ISODate('2025-04-16T01:35:28.905Z')
  },
  members: [
    {
      _id: 0,
      name: 'mongo-primary:27017',
      health: 1,
      state: 1,
      stateStr: 'PRIMARY',
      uptime: 63,
      optime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeDate: ISODate('2025-04-16T01:35:28.000Z'),
      optimeWritten: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeWrittenDate: ISODate('2025-04-16T01:35:28.000Z'),
      lastAppliedWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastDurableWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastWrittenWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      syncSourceHost: '',
      syncSourceId: -1,
      infoMessage: 'Could not find member to sync from',
      electionTime: Timestamp({ t: 1744767328, i: 1 }),
      electionDate: ISODate('2025-04-16T01:35:28.000Z'),
      configVersion: 1,
      configTerm: 1,
      self: true,
      lastHeartbeatMessage: ''
    },
    {
      _id: 1,
      name: 'mongo-secondary1:27017',
      health: 1,
      state: 2,
      stateStr: 'SECONDARY',
      uptime: 24,
      optime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeDurable: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeWritten: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeDate: ISODate('2025-04-16T01:35:28.000Z'),
      optimeDurableDate: ISODate('2025-04-16T01:35:28.000Z'),
      optimeWrittenDate: ISODate('2025-04-16T01:35:28.000Z'),
      lastAppliedWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastDurableWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastWrittenWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastHeartbeat: ISODate('2025-04-16T01:35:42.424Z'),
      lastHeartbeatRecv: ISODate('2025-04-16T01:35:41.428Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: '',
      syncSourceHost: 'mongo-primary:27017',
      syncSourceId: 0,
      infoMessage: '',
      configVersion: 1,
      configTerm: 1
    },
    {
      _id: 2,
      name: 'mongo-secondary2:27017',
      health: 1,
      state: 2,
      stateStr: 'SECONDARY',
      uptime: 24,
      optime: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeDurable: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeWritten: { ts: Timestamp({ t: 1744767328, i: 16 }), t: Long('1') },
      optimeDate: ISODate('2025-04-16T01:35:28.000Z'),
      optimeDurableDate: ISODate('2025-04-16T01:35:28.000Z'),
      optimeWrittenDate: ISODate('2025-04-16T01:35:28.000Z'),
      lastAppliedWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastDurableWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastWrittenWallTime: ISODate('2025-04-16T01:35:28.443Z'),
      lastHeartbeat: ISODate('2025-04-16T01:35:42.424Z'),
      lastHeartbeatRecv: ISODate('2025-04-16T01:35:41.424Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: '',
      syncSourceHost: 'mongo-primary:27017',
      syncSourceId: 0,
      infoMessage: '',
      configVersion: 1,
      configTerm: 1
    }
  ],
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1744767328, i: 16 }),
    signature: {
      hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
      keyId: Long('0')
    }
  },
  operationTime: Timestamp({ t: 1744767328, i: 16 })
}

- Benefits:
replication ensures high availability, enables automatic failover if primary crashes and maintains data redundancy

