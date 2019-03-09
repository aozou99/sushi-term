export namespace Types {
  export type Options = {
    [key: string]: string | undefined;
  };
  export type ParsedArgs = {
    mainOptions: Types.Options;
    subCommand: string | undefined;
    subOptions: Types.Options;
    subArgs: string[];
  };
}
