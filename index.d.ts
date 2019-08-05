declare module 'egg' {
  export interface Application {
    udp: EggUdp;
  }

  type Handler = (udp: any) => void;

  interface EggUdp {
    handle( handler: string | Handler);
    controller: any;
  }
}
