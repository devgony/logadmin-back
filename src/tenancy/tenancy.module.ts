import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Connection, createConnection, getConnectionManager } from 'typeorm';

// const connectionFactory = {
//   provide: 'CONNECTION',
//   scope: Scope.REQUEST,
//   useFactory: async (req) => {
//     const teamId = req.headers['x-team-id'];
//     if (teamId) {
//       const connectionName = `team_${teamId}`;
//       const connectionManager = getConnectionManager();

//       if (connectionManager.has(connectionName)) {
//         const connection = connectionManager.get(connectionName);
//         return Promise.resolve(
//           connection.isConnected ? connection : connection.connect(),
//         );
//       }

//       return createConnection({
//         ...tenantsOrmconfig,
//         entities: [
//           ...(tenantsOrmconfig as any).entities,
//           ...(ormconfig as any).entities,
//         ],
//         name: connectionName,
//         type: 'postgres',
//         schema: connectionName,
//       });
//     }
//   },
//   inject: [REQUEST],
// };

// @Global()
// @Module({
//   providers: [connectionFactory],
//   exports: ['CONNECTION'],
// })
export class TenancyModule {}
