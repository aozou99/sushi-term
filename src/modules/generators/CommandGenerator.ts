import { staticImplements } from "modules/decorators/class/staticImplements";
import { IGenerator } from "modules/generators/IGenerator";
import { CommandMap } from "modules/constants/CommandMap";
import { Command } from "modules/commands/Command";
import { NotFoundCommand } from "modules/commands/NotFoundCommand";

@staticImplements<IGenerator>()
export class CommandGenerator {
  public static generate(command: string, args: string[]): Command {
    const commandClass = CommandMap[command];
    if (commandClass === undefined) {
      return new NotFoundCommand(args, command);
    }
    return new commandClass(args);
  }
}
