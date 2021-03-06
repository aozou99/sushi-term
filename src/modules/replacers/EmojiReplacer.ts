import { Replacer } from "./Replacer";
import { staticImplements } from "modules/decorators/class/staticImplements";
import { MenuPhotos } from "modules/constants/Menu";

@staticImplements<Replacer>()
export class EmojiReplacer {
  public static replace(text: string): string {
    for (const search of Object.keys(MenuPhotos)) {
      text = text.split(search).join(MenuPhotos[search]);
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
