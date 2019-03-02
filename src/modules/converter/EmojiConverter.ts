import { Converter } from "./Converter";
import { staticImplements } from "modules/decorator/class/staticImplements";
import { EmojiList } from "modules/constants/EmojiList";

@staticImplements<Converter>()
export class EmojiConverter {
  public static convert(word: string): string {
    return EmojiList[word] || word;
  }

  public static convertAll(wordList: string[]): string[] {
    const after = [];
    for (const word of wordList) {
      after.push(EmojiConverter.convert(word));
    }
    return after;
  }
}
