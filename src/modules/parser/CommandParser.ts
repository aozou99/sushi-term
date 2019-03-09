import { Types } from "modules/constants/Types";
import { ICommand } from "modules/commands/interface/ICommand";
import { IParser } from "./IParser";
import { staticImplements } from "modules/decorators/class/staticImplements";

@staticImplements<IParser>()
export class CommandParser {
  public constructor(readonly command: ICommand) {}

  public static parse(
    command: ICommand,
    args: ReadonlyArray<string>
  ): Types.ParsedArgs {
    const parser = new CommandParser(command);
    const cloneArgs = args.concat();
    return {
      mainOptions: parser.parseMainOptions(cloneArgs, true),
      subCommand: parser.parseSubCommand(cloneArgs, true),
      subOptions: parser.parseSubOptions(cloneArgs, true),
      subArgs: parser.parseSubArgs(cloneArgs)
    };
  }

  /**
   * #### argsは↓のような構成になっていることを期待しています
   * `--mainOp mainOpV subCmd --subOp args1 args2 ...`
   * #### update=trueで↓のようにmainOpに該当した箇所を削除します
   * `subCmd --subOp args1 args2 ...`
   * @param args
   * @param update
   */
  public parseMainOptions(
    args: string[],
    update: boolean = false
  ): Types.Options {
    const subCmds = this.command.SUB_COMMANDS;
    const subCmdIdx = args.findIndex(v => subCmds.includes(v));
    let excluded: string[];
    // サブコマンドの1つ前までを検索対象とする
    if (subCmdIdx > -1) {
      excluded = args.slice(0, subCmdIdx);
    } else {
      excluded = args.concat();
    }

    return CommandParser.filterOptions(
      excluded,
      this.command.MAIN_OPTIONS,
      update,
      args
    );
  }

  /**
   * #### argsは↓のような構成になっていることを期待しています
   * `subCmd --subOp subOpV args1 arg2 ...`
   * #### update=trueで↓のようにsubCmdに該当した箇所を削除します
   * `--subOp subOpV args1 arg2 ...`
   * @param args
   * @param update
   */
  public parseSubCommand(
    args: string[],
    update: boolean = false
  ): string | undefined {
    if (args.length < 1 || !this.command.SUB_COMMANDS.includes(args[0])) {
      return undefined;
    }
    return update ? args.shift() : args[0];
  }

  /**
   * #### argsは↓のような構成になっていることを期待しています
   * `--subOp subOpV args1 arg2 ...`
   * #### update=trueで↓のようにsubOpに該当した箇所を削除します
   * `args1 arg2 ...`
   * @param args
   * @param update
   */
  public parseSubOptions(
    args: string[],
    update: boolean = false
  ): Types.Options {
    return CommandParser.filterOptions(
      args,
      this.command.SUB_OPTIONS,
      update,
      args
    );
  }

  /**
   * #### argsは↓のような構成になっていることを期待しています
   * `args1 arg2 ...`
   * @param args
   */
  public parseSubArgs(args: string[]): string[] {
    return args;
  }

  public static filterOptions(
    args: string[],
    definedOp: Types.Options,
    update: boolean,
    originArgs: string[]
  ): Types.Options {
    const options: Types.Options = {};
    const spliceIdxs = [];
    // optionを抽出
    for (const opName of Object.keys(definedOp)) {
      let opIdx: number;
      if ((opIdx = args.indexOf(opName)) < 0) continue;

      // optionが引数を必要するケースか判断し処理する
      let opVal: string | undefined = undefined;
      if (
        definedOp[opName] &&
        args[opIdx + 1] !== undefined &&
        args[opIdx + 1].indexOf("-") !== 0
      ) {
        opVal = args[opIdx + 1];
      }
      options[opName] = opVal;

      // 削る添字を覚えておく
      if (update) {
        spliceIdxs.push(opIdx) && opVal && spliceIdxs.push(opIdx + 1);
      }
    }
    // 大きい添字から削って整合性を保つ
    if (update) {
      for (const i of spliceIdxs.reverse()) {
        originArgs.splice(i, 1);
      }
    }

    return options;
  }
}
