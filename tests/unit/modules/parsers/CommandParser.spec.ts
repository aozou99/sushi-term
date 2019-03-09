import { CommandParser } from "modules/parser/CommandParser";
import { Command } from "modules/commands/Command";
import { Types } from "modules/constants/Types";

describe("CommandParser", () => {
  // テスト用のCommandクラスを実装
  class TestCommand extends Command {
    static readonly MAIN_OPTIONS: Readonly<Types.Options> = {
      "-a": undefined,
      "-b": "string",
      "--long": undefined
    };
    static readonly SUB_COMMANDS: ReadonlyArray<string> = [
      "subCmd1",
      "subCmd2"
    ];
    static readonly SUB_OPTIONS: Readonly<Types.Options> = {
      "-s": undefined,
      "-t": "string",
      "--long": "string"
    };

    constructor(readonly args: string[]) {
      super("test", args, TestCommand);
    }
    public execute() {}
  }
  // CommandParser.parseのモック化
  const mockParse = jest.spyOn(CommandParser, "parse");
  mockParse.mockReturnValue({
    mainOptions: {},
    subCommand: undefined,
    subOptions: {},
    subArgs: []
  });
  const parser = new CommandParser(TestCommand);
  mockParse.mockRestore();

  describe("parseMainOptions()", () => {
    it("正常にMainOptionがパースされて、引数が更新されていること", () => {
      let splited = "-a -b val --long subCmd1 -s -t val --long arg1 arg2".split(
        " "
      );
      let act = parser.parseMainOptions(splited, true);
      expect(act).toEqual({
        "-a": undefined,
        "-b": "val",
        "--long": undefined
      });
      expect(splited).toEqual("subCmd1 -s -t val --long arg1 arg2".split(" "));
    });
  });
  describe("parseSubCommand()", () => {
    it("正常にSubCommandがパースされて、引数が更新されていること", () => {
      const splited = "subCmd1 -s -t val --long arg1 arg2".split(" ");
      const act = parser.parseSubCommand(splited, true);
      expect(act).toBe("subCmd1");
      expect(splited).toEqual("-s -t val --long arg1 arg2".split(" "));
    });
  });
  describe("parseSubOptions()", () => {
    it("正常にSubOptiondがパースされて、引数が更新されていること", () => {
      const splited = "-s -t val --long val arg1 arg2".split(" ");
      const act = parser.parseSubOptions(splited, true);
      expect(act).toEqual({ "-s": undefined, "-t": "val", "--long": "val" });
      expect(splited).toEqual("arg1 arg2".split(" "));
    });
  });
  describe("parseSubArgs()", () => {
    it("正常にargsがパースできること", () => {
      const splited = "arg1 arg2".split(" ");
      const act = parser.parseSubArgs(splited);
      expect(act).toEqual(["arg1", "arg2"]);
    });
  });
  describe("parse()", () => {
    it("正常にParsedArgsが設定されていること", () => {
      let splited = "-a -b val --long subCmd1 -s -t val --long val arg1 arg2".split(
        " "
      );
      const act = new TestCommand(splited).parsedArgs;
      expect(act).toEqual({
        mainOptions: { "-a": undefined, "-b": "val", "--long": undefined },
        subCommand: "subCmd1",
        subOptions: { "-s": undefined, "-t": "val", "--long": "val" },
        subArgs: ["arg1", "arg2"]
      });
    });
  });
});
