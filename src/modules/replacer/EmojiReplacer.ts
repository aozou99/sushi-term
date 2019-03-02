import { Replacer } from "./Replacer";
import { staticImplements } from "modules/decorator/class/staticImplements";
import { EmojiList } from "modules/constants/EmojiList";

@staticImplements<Replacer>()
export class EmojiReplacer {
  public static replace(text: string): string {
    for (const search of Object.keys(EmojiList)) {
      text = text.split(search).join(EmojiList[search]);
    }
    return text;
  }

  public static replaceAll(textList: string[]): string[] {
    const after = [];
    for (const word of textList) {
      after.push(EmojiReplacer.replace(word));
    }
    return after;
  }
}
