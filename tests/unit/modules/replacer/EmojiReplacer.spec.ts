import { EmojiReplacer } from "modules/replacer/EmojiReplacer";
import { EmojiList } from "modules/constants/EmojiList";

describe("EmojiReplacer", () => {
  describe("replace()", () => {
    it("絵文字に置換されていること", () => {
      for (const before of Object.keys(EmojiList)) {
        const after = EmojiReplacer.replace(before);
        expect(after).toBe(EmojiList[before]);
      }
    });
    it("対象外の文字は置換されないこと", () => {
      for (const before of Object.keys(EmojiList)) {
        const expected1 = `${EmojiList[before]}_`;
        const expected2 = `_${EmojiList[before]}`;
        const after1 = EmojiReplacer.replace(expected1);
        const after2 = EmojiReplacer.replace(expected2);
        expect(after1).toBe(expected1);
        expect(after2).toBe(expected2);
      }
    });
  });
  describe("replaceAll()", () => {
    it("絵文字に置換されていること", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(EmojiList));
      expect(after).toEqual(Object.values(EmojiList));
    });
    it("対象外の文字は置換されないこと", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(EmojiList)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(EmojiList).push("hoge"));
    });
  });
});
