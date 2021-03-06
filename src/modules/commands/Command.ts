import { ICommand } from "./interface/ICommand";
import { CommandParser } from "modules/parser/CommandParser";
import { Types } from "modules/constants/Types";
import { System } from "modules/systems/Sysytem";

export abstract class Command {
  readonly parsedArgs: Types.ParsedArgs;

  public constructor(
    readonly command: string,
    readonly args: ReadonlyArray<string>,
    readonly define: ICommand
  ) {
    this.parsedArgs = CommandParser.parse(define, args);
  }

  public abstract execute(system: System): void;
}
