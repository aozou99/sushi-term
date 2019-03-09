import { Command } from "modules/commands/Command";

export const CommandMap: {
  [key: string]: { new (command: string, args: string[]): Command };
} = {};
