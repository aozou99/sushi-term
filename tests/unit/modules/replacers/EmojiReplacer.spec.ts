import { EmojiReplacer } from "modules/replacers/EmojiReplacer";
import { EmojiMap } from "modules/constants/EmojiMap";

describe("EmojiReplacer", () => {
  describe("replace()", () => {
    it("絵文字に置換されていること", () => {
      for (const before of Object.keys(EmojiMap)) {
        const after = EmojiReplacer.replace(before);
        expect(after).toBe(EmojiMap[before]);
      }
    });
    it("対象外の文字は置換されないこと", () => {
      for (const before of Object.keys(EmojiMap)) {
        const expected1 = `${EmojiMap[before]}_`;
        const expected2 = `_${EmojiMap[before]}`;
        const after1 = EmojiReplacer.replace(expected1);
        const after2 = EmojiReplacer.replace(expected2);
        expect(after1).toBe(expected1);
        expect(after2).toBe(expected2);
      }
    });
  });
  describe("replaceAll()", () => {
    it("絵文字に置換されていること", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(EmojiMap));
      expect(after).toEqual(Object.values(EmojiMap));
    });
    it("対象外の文字は置換されないこと", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(EmojiMap)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(EmojiMap).push("hoge"));
    });
  });
});
