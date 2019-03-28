import { CommandSeparater } from "modules/separaters/CommandSeparater";
import { Operator } from "modules/operators/CommandOperator";
import { System } from "modules/systems/Sysytem";

export class CommandManager {
  public static system: System;

  public static init(output: object[]) {
    CommandManager.system = new System(output);
  }

  public static manage(input: string): void {
    for (const cmdOrOp of CommandSeparater.separate(input)) {
      switch (cmdOrOp) {
        case Operator.Ampersand:
          // TODO:いつかやりたい
          break;

        case Operator.And:
          // TODO:いつかやりたい
          break;

        case Operator.Or:
          // TODO:いつかやりたい
          break;

        case Operator.Semicolon:
          // TODO:いつかやりたい
          break;

        default:
          cmdOrOp.execute(CommandManager.system);
          break;
      }
    }
  }
}
