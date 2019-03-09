import { CommandSeparater } from "modules/separaters/CommandSeparater";

describe("CommandSeparater", () => {
  describe("separeteBy()", () => {
    it("正常に指定した区切り文字で分割されていること", () => {
      const text = "abc d && e || f; g || h";
      const ans = ["abc d", "&&", "e", "||", "f", ";", "g", "||", "h"];
      const act = CommandSeparater.separateBy(text, ["&&", "||", ";"]);
      expect(act).toEqual(ans);
    });
    it("指定した区切り文字に1件も該当しない場合", () => {
      const text = "abc d && e || f; g || h";
      const ans = ["abc d && e || f; g || h"];
      const act = CommandSeparater.separateBy(text, ["+", "-", "/"]);
      expect(act).toEqual(ans);
    });
  });
});
