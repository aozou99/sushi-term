import { EmojiConverter } from "modules/converters/EmojiConverter";
import { EmojiMap } from "modules/constants/EmojiMap";

describe("EmojiConverter", () => {
  describe("convert()", () => {
    it("絵文字に変換されていること", () => {
      for (const before of Object.keys(EmojiMap)) {
        const after = EmojiConverter.convert(before);
        expect(after).toBe(EmojiMap[before]);
      }
    });
    it("対象外の文字は変換されないこと", () => {
      for (const before of Object.keys(EmojiMap)) {
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
      const after = EmojiConverter.convertAll(Object.keys(EmojiMap));
      expect(after).toEqual(Object.values(EmojiMap));
    });
    it("対象外の文字は変換されないこと", () => {
      const after = EmojiConverter.convertAll(Object.keys(EmojiMap)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(EmojiMap).push("hoge"));
    });
  });
});
