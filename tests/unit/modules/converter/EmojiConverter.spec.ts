import { EmojiConverter } from "modules/converter/EmojiConverter";
import { EmojiList } from "modules/constants/EmojiList";

describe("EmojiConverter", () => {
  describe("convert()", () => {
    it("絵文字に変換されていること", () => {
      for (const before of Object.keys(EmojiList)) {
        const after = EmojiConverter.convert(before);
        expect(after).toBe(EmojiList[before]);
      }
    });
  });
});
