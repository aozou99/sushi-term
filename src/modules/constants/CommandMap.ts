import { TaisyoCommand } from "modules/commands/TaisyoCommand";
import { CommandImpl } from "./Types";

export const CommandMap: {
  [key: string]: CommandImpl;
} = {
  taisyo: TaisyoCommand
};
