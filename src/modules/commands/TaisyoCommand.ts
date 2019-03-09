import { Command } from "./Command";
import { Types } from "modules/constants/Types";

export class TaisyoCommand extends Command {
  static readonly MAIN_OPTIONS: Readonly<Types.Options> = {};
  static readonly SUB_COMMANDS: ReadonlyArray<string> = ["order"];
  static readonly SUB_OPTIONS: Readonly<Types.Options> = {};
  public constructor(args: string[]) {
    super("taisyo", args, TaisyoCommand);
  }

  public execute() {}
}
