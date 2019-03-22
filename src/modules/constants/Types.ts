import { Command } from "modules/commands/Command";

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
export type CommandImpl = {
  new (args: string[]): Command;
};
