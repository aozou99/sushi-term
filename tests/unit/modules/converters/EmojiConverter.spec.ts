import { EmojiConverter } from "modules/converters/EmojiConverter";
import { MenuPhotos } from "modules/constants/Menu";

describe("EmojiConverter", () => {
  describe("convert()", () => {
    it("絵文字に変換されていること", () => {
      for (const before of Object.keys(MenuPhotos)) {
        const after = EmojiConverter.convert(before);
        expect(after).toBe(MenuPhotos[before]);
      }
    });
    it("対象外の文字は変換されないこと", () => {
      for (const before of Object.keys(MenuPhotos)) {
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
      const after = EmojiConverter.convertAll(Object.keys(MenuPhotos));
      expect(after).toEqual(Object.values(MenuPhotos));
    });
    it("対象外の文字は変換されないこと", () => {
      const after = EmojiConverter.convertAll(Object.keys(MenuPhotos)).push(
        "hoge"
      );
      expect(after).toEqual(Object.values(MenuPhotos).push("hoge"));
    });
  });
});
