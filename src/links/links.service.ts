import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { errLog } from 'src/common/hooks/errLog';
import { createConnection, Repository } from 'typeorm';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { FindLinksOutput } from './dtos/find-links.dto';
import { TestLinkInput, TestLinkOuput } from './dtos/test-link';
import { Link } from './entities/links.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly links: Repository<Link>,
  ) {}

  async createLink({
    name,
    host,
    port,
    database,
    connectString,
    username,
    password,
  }: CreateLinkInput): Promise<CreateLinkOutput> {
    try {
      const connExists = await this.links.findOne({
        where: { host, port, database },
      });
      if (connExists) {
        return {
          ok: false,
          error: 'Link with the connection string already exists',
        };
      }
      const nameExists = await this.links.findOne({
        where: { name },
      });
      if (nameExists) {
        return {
          ok: false,
          error: 'The name already exists',
        };
      }
      const Link = await this.links.save(
        this.links.create({
          name,
          host,
          port,
          database,
          connectString,
          username,
          password,
        }),
      );
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: 'Could not create Db.' };
    }
  }

  async findLinks(): Promise<FindLinksOutput> {
    try {
      const Links = await this.links.find();
      return { Links };
    } catch (error) {
      errLog(__filename, error);
    }
  }

  async testLink({ name }: TestLinkInput): Promise<TestLinkOuput> {
    try {
      const { host, port, database, username, password } =
        await this.links.findOne({ where: { name } });
      if (!host) {
        return { ok: false, error: 'Connection does not exist' };
      }
      // do sth
      const connection = await createConnection({
        type: 'postgres',
        name,
        host,
        port,
        username,
        password,
        database,
      });
      if (!connection.isConnected) {
        return { ok: false, error: 'Connection failed' };
      }
      console.log(connection.isConnected);
      console.log(await connection.query(`select 1`));
      // await this.getPool({ host, port, database, username, password });
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: 'Connection failed' };
    }
  }

  // async getPool({
  //   host,
  //   port,
  //   database,
  //   username,
  //   password,
  // }: Omit<CreateLinkInput, 'name'>) {
  //   TypeOrmModule.forRootAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     // Use useFactory, useClass, or useExisting
  //     // to configure the ConnectionOptions.
  //     useFactory: (configService: ConfigService) => ({
  //       type: 'postgres',
  //       host,
  //       port: parseInt(port),
  //       username,
  //       password,
  //       database,
  //       synchronize: false,
  //     }),
  //     // connectionFactory receives the configured ConnectionOptions
  //     // and returns a Promise<Connection>.
  //     connectionFactory: async (options) => {
  //       const connection = await createConnection(options);
  //       console.log(connection);
  //       return connection;
  //     },
  //   });
  // }
}
