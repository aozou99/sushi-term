import { staticImplements } from "modules/decorators/class/staticImplements";
import { IGenerator } from "modules/generators/IGenerator";
import { CommandMap } from "modules/constants/CommandMap";
import { Command } from "modules/commands/Command";

@staticImplements<IGenerator>()
export class CommandGenerator {
  public static generate(command: string, args: string[]): Command {
    const commandClass = CommandMap[command];
    if (!(commandClass instanceof Command)) {
      // TODO:
      // return new NotFoundCommand(command, args);
    }
    return new commandClass(command, args);
  }
}
