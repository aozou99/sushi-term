import { EmojiReplacer } from "modules/replacers/EmojiReplacer";
import { MenuPhotos } from "modules/constants/Menu";

describe("EmojiReplacer", () => {
  describe("replace()", () => {
    it("絵文字に置換されていること", () => {
      for (const before of Object.keys(MenuPhotos)) {
        const after = EmojiReplacer.replace(before);
        expect(after).toBe(MenuPhotos[before]);
      }
    });
    it("対象外の文字は置換されないこと", () => {
      for (const before of Object.keys(MenuPhotos)) {
        const expected1 = `${MenuPhotos[before]}_`;
        const expected2 = `_${MenuPhotos[before]}`;
        const after1 = EmojiReplacer.replace(expected1);
        const after2 = EmojiReplacer.replace(expected2);
        expect(after1).toBe(expected1);
        expect(after2).toBe(expected2);
      }
    });
  });
  describe("replaceAll()", () => {
    it("絵文字に置換されていること", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(MenuPhotos));
      expect(after).toEqual(Object.values(MenuPhotos));
    });
    it("対象外の文字は置換されないこと", () => {
      const after = EmojiReplacer.replaceAll(Object.keys(MenuPhotos)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(MenuPhotos).push("hoge"));
    });
  });
});
