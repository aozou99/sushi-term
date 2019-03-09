import { Converter } from "./Converter";
import { staticImplements } from "modules/decorators/class/staticImplements";
import { EmojiMap } from "modules/constants/EmojiMap";

@staticImplements<Converter>()
export class EmojiConverter {
  public static convert(word: string): string {
    return EmojiMap[word] || word;
  }

  public static convertAll(wordList: string[]): string[] {
    const after = [];
    for (const word of wordList) {
      after.push(EmojiConverter.convert(word));
    }
    return after;
  }
}
