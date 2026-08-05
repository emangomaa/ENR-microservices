import { RedisOptions } from 'ioredis/built/cluster/util';

export interface RedisConfiguration extends RedisOptions {
  host: string;
  port: number;
  password?: string;
}