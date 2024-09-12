export abstract class BaseConnection {
  abstract connect(): Promise<void>;
}
