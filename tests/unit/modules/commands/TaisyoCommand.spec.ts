import { TaisyoCommand } from "modules/commands/TaisyoCommand";

describe("TaisyoCommand", () => {
  describe("constructor()", () => {
    it("正常にインスタンスが生成されParsedArgsが設定されていること", () => {
      const command = new TaisyoCommand("order -r -n 100 sushi".split(" "));
      expect(command).toBeInstanceOf(TaisyoCommand);
      expect(command.parsedArgs).toEqual({
        mainOptions: {},
        subArgs: ["sushi"],
        subCommand: "order",
        subOptions: { "-r": undefined, "-n": "100" }
      });
    });
  });
});
