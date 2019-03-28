import { ISeparater } from "./ISeparater";
import { staticImplements } from "modules/decorators/class/staticImplements";
import { Command } from "modules/commands/Command";
import {
  Operator,
  toOperator,
  listOperators
} from "modules/operators/CommandOperator";
import { CommandGenerator } from "modules/generators/CommandGenerator";

@staticImplements<ISeparater>()
export class CommandSeparater {
  /**
   * 入力された1行テキストからコマンド/演算子の単位で分割して返却します
   * @param text
   */
  public static separate(text: string): Array<Command | Operator> {
    const statck: Array<Command | Operator> = [];
    const separated = CommandSeparater.separateBy(text, listOperators());
    for (const ele of separated) {
      // &&,|| とか
      if (typeof toOperator(ele) === "number") {
        statck.push(toOperator(ele) as Operator);
        continue;
      }
      // -abc => [-a, -b, -c]
      let splited: string[] = ele.split(" ").map(v => {
        if (v.indexOf("--") < 0 && v.indexOf("-") === 0) {
          return v
            .substr(1)
            .split("")
            .map(v => `-${v}`);
        }
        return v;
      }) as string[];
      splited = Array.prototype.concat.apply([], splited);

      statck.push(CommandGenerator.generate(splited.shift() || "", splited));
    }

    return statck;
  }

  /**
   * "cmdA && cmdB optionA || cmdC"を↓のように分割します
   * ["cmdA", "&&", "cmdB optionA", "||", "cmdC"]
   * @param text
   * @param delimiters
   */
  public static separateBy(text: string, delimiters: string[]): string[] {
    const stack = [];
    const includedDeli = delimiters.filter(v => text.indexOf(v) > -1);
    if (includedDeli.length === 0) {
      return [text];
    }
    for (const delimiter of includedDeli) {
      const splited = text.split(delimiter);
      if (splited.length > 1) {
        for (const ele of splited) {
          stack.push(CommandSeparater.separateBy(ele, includedDeli));
          stack.push(delimiter);
        }
        stack.pop();
        break;
      }
    }
    return Array.prototype.concat
      .apply([], stack)
      .filter((v: string) => v !== "")
      .map((v: string) => v.trim());
  }
}
