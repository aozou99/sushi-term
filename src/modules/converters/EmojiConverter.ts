import { Converter } from "./Converter";
import { staticImplements } from "modules/decorators/class/staticImplements";
import { MenuPhotos } from "modules/constants/Menu";

@staticImplements<Converter>()
export class EmojiConverter {
  public static convert(word: string, strict: boolean = false): string {
    if (strict) {
      return MenuPhotos[word];
    }
    return MenuPhotos[word] || word;
  }

  public static convertAll(wordList: string[]): string[] {
    const after = [];
    for (const word of wordList) {
      after.push(EmojiConverter.convert(word));
    }
    return after;
  }
}
