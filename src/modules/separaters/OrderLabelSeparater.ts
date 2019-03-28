import { staticImplements } from "modules/decorators/class/staticImplements";
import { ISeparater } from "./ISeparater";
import { Types } from "modules/constants/Types";

@staticImplements<ISeparater>()
export class OrderLabelSeparater {
  /**
   * ### `変換前` label1:num1,label2:num2,num3,...
   * ### `変換後` {label1:num1,label2:num2,all:num3,...}
   * @param text
   */
  public static separate(text: string): Types.OrderLabel {
    return text.split(",").reduce(
      (p, c) => {
        const splited = c.split(":");
        if (splited.length !== 2) {
          if (splited.length === 1 && splited[0].match(/^\d+$/)) {
            p["all"] = Number(splited[0]);
          }
          return p;
        }
        p[splited[0]] = splited[1].match(/^\d+$/) ? Number(splited[1]) : 1;
        return p;
      },
      {} as Types.OrderLabel
    );
  }
}
