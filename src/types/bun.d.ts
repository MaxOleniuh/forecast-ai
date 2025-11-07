declare module "bun" {
  export function serve(options: {
    port: number;
    fetch: (req: Request) => Response | Promise<Response>;
  }): void;
}
