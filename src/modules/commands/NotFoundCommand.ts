import { Command } from "./Command";
import { Types } from "modules/constants/Types";
import { System } from "modules/systems/Sysytem";

export class NotFoundCommand extends Command {
  static readonly MAIN_OPTIONS: Readonly<Types.Options> = {};
  static readonly SUB_COMMANDS: ReadonlyArray<string> = [];
  static readonly SUB_OPTIONS: Readonly<Types.Options> = {};
  public constructor(args: string[], command: string) {
    super(command, args, NotFoundCommand);
  }

  public execute(system: System) {
    system.out(`😇 : ${this.command}: command not found`);
  }
}
