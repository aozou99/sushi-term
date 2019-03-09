import { TaisyoCommand } from "modules/commands/TaisyoCommand";

describe("TaisyoCommand", () => {
  describe("constructor()", () => {
    it("正常にインスタンスが生成されParsedArgsが設定されていること", () => {
      const command = new TaisyoCommand("order -a 100".split(" "));
      expect(command).toBeInstanceOf(TaisyoCommand);
      expect(command.parsedArgs).toEqual({
        mainOptions: {},
        subArgs: ["-a", "100"],
        subCommand: "order",
        subOptions: {}
      });
    });
  });
});
