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
    it("対象外の文字は変換されないこと", () => {
      for (const before of Object.keys(EmojiList)) {
        const expected1 = `${before}_`;
        const expected2 = `_${before}`;
        const after1 = EmojiConverter.convert(expected1);
        const after2 = EmojiConverter.convert(expected2);
        expect(after1).toBe(expected1);
        expect(after2).toBe(expected2);
      }
    });
  });
  describe("convertAll()", () => {
    it("絵文字に変換されていること", () => {
      const after = EmojiConverter.convertAll(Object.keys(EmojiList));
      expect(after).toEqual(Object.values(EmojiList));
    });
    it("対象外の文字は変換されないこと", () => {
      const after = EmojiConverter.convertAll(Object.keys(EmojiList)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(EmojiList).push("hoge"));
    });
  });
});
