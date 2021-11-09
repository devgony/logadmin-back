# Logadmin-backend

- Query => connection test => return true  
  ~~- Query => start infinite pub => return true?~~
- Subscription
  - start infinite pub => return true?
  - start listening

## Should handle unique sub not just only db conn

```
/Users/henry/Node/logadmin-back/node_modules/oracledb/lib/pool.js:126
          reject(new Error(nodbUtil.getErrorMessage('NJS-040',
                 ^
Error: NJS-040: connection request timeout. Request exceeded queueTimeout of 60000
    at Timeout._onTimeout (/Users/henry/Node/logadmin-back/node_modules/oracledb/lib/pool.js:126:18)
    at listOnTimeout (node:internal/timers:557:17)
    at processTimers (node:internal/timers:500:7)

```
