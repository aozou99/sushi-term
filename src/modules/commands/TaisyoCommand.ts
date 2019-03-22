import { Command } from "./Command";
import { Types } from "modules/constants/Types";
import { System } from "modules/systems/Sysytem";
import log from "ts-log-class";

@log()
export class TaisyoCommand extends Command {
  static readonly MAIN_OPTIONS: Readonly<Types.Options> = {};
  static readonly SUB_COMMANDS: ReadonlyArray<string> = ["order"];
  static readonly SUB_OPTIONS: Readonly<Types.Options> = {};
  public constructor(args: string[]) {
    super("taisyo", args, TaisyoCommand);
  }

  public execute(system: System) {
    // usageを表示したら処理終了
    if (this.doShowUsage(system, this.prefix, this.subCommand, this.subArgs)) {
      return;
    }
    //
    switch (this.subCommand) {
      case "order":
        this[this.subCommand](
          system,
          this.prefix,
          this.subOptions,
          this.subArgs
        );
        break;

      default:
        break;
    }
  }

  public order(
    system: System,
    prefix: string,
    subOptions?: Types.Options,
    subArgs?: string[]
  ): void {}

  private doShowUsage(
    system: System,
    prefix: string,
    subCommand?: string,
    subArgs?: string[]
  ): boolean {
    const res = subCommand === undefined;
    if (res) {
      if (subArgs !== undefined && subArgs.length > 0) {
        system.out(
          `${prefix} '${
            subArgs[0]
          }' is not a taisyo command. See 'taisyo --help.'`
        );
      } else {
        system.out(`See 'taisyo --help.'`);
      }
    }
    return res;
  }

  public get subCommand(): string | undefined {
    if (!this.parsedArgs) {
      return undefined;
    }
    return this.parsedArgs.subCommand;
  }

  public get subArgs(): string[] | undefined {
    if (!this.parsedArgs) {
      return undefined;
    }
    return this.parsedArgs.subArgs;
  }

  public get subOptions(): Types.Options | undefined {
    if (!this.parsedArgs) {
      return undefined;
    }
    return this.parsedArgs.subOptions;
  }

  public get prefix(): string {
    return `${this.command}: `;
  }
}
