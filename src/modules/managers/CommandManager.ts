import { CommandSeparater } from "modules/separaters/CommandSeparater";
import { Operator } from "modules/operators/CommandOperator";
import { System } from "modules/systems/Sysytem";
import log from "ts-log-class";

@log()
export class CommandManager {
  public static system: System;

  public static init(output: object[]) {
    CommandManager.system = new System(output);
  }

  public static manage(input: string): void {
    for (const cmdOrOp of CommandSeparater.separate(input)) {
      console.log(cmdOrOp);
      switch (cmdOrOp) {
        case Operator.Ampersand:
          break;

        case Operator.And:
          break;

        case Operator.Or:
          break;

        case Operator.Semicolon:
          break;

        default:
          cmdOrOp.execute(CommandManager.system);
          break;
      }
    }
  }
}
