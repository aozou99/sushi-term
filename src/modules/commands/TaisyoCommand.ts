import { Command } from "./Command";
import { Types } from "modules/constants/Types";
import { System } from "modules/systems/Sysytem";
import { EmojiConverter } from "modules/converters/EmojiConverter";
import { OrderLabelSeparater } from "modules/separaters/OrderLabelSeparater";
import { MenuMap, MenuPrices, MenuPhotos } from "modules/constants/Menu";
import _ from "lodash";
import {
  createLocalStorage,
  LocalStoragePonyfill
} from "localstorage-ponyfill";

export class TaisyoCommand extends Command {
  static readonly MAIN_OPTIONS: Readonly<Types.Options> = {};
  static readonly SUB_COMMANDS: ReadonlyArray<string> = [
    "order",
    "menu",
    "bill"
  ];
  static readonly SUB_OPTIONS: Readonly<Types.Options> = {
    "-n": "string",
    "-r": undefined
  };
  static readonly localStorage: LocalStoragePonyfill = createLocalStorage();

  public constructor(args: string[]) {
    super("taisyo", args, TaisyoCommand);
  }

  public execute(system: System) {
    // usageを表示したら処理終了
    if (this.doShowUsage(system, this.prefix, this.subCommand, this.subArgs)) {
      return;
    }
    // サブコマンドに対応するメソッドを実行
    switch (this.subCommand) {
      case "order":
      case "menu":
      case "bill":
        this[this.subCommand](
          system,
          this.prefix,
          this.subOptions,
          this.subArgs,
          TaisyoCommand.localStorage
        );
        break;

      default:
        break;
    }
  }

  /**
   * #### サブコマンド `bill`
   * @param system
   * @param prefix
   */
  public bill(
    system: System,
    prefix: string,
    _subOptions: Types.Options,
    _subArgs: string[],
    localStorage: LocalStoragePonyfill
  ): void {
    // 累計注文数
    const orderHistory: Types.OrderLabel = JSON.parse(
      localStorage.getItem("order_history") || "{}"
    );
    // 支払い済み注文数
    const billHistory: Types.OrderLabel = JSON.parse(
      localStorage.getItem("bill_history") || "{}"
    );
    // 会計
    system.out(`${prefix} あいよ!`);
    let totalBill = 0;
    _.each(orderHistory, (num, meal) => {
      if (billHistory[meal] === undefined) billHistory[meal] = 0;
      const shouldBillOrder = num - billHistory[meal];
      if (shouldBillOrder > 0) {
        const bill = shouldBillOrder * MenuPrices[meal];
        system.out(
          `${MenuPhotos[meal]} : ${shouldBillOrder} ✖ ${
            MenuPrices[meal]
          } = ${bill.toLocaleString()}円`
        );
        totalBill += bill;
        // 支払い分を追記
        billHistory[meal] += shouldBillOrder;
      }
    });
    // 出力
    if (totalBill > 0) {
      system.out(
        `${prefix} 毎度！しめて合計で<b>${totalBill.toLocaleString()}</b>円だよ！`
      );
    } else {
      system.out(`${prefix} って何も食ってないんかーい！`);
    }
    system.out(`&nbsp;`);
    // 精算分を記録
    localStorage.setItem("bill_history", JSON.stringify(billHistory));
  }

  /**
   * #### サブコマンド `menu`
   * @param system
   * @param prefix
   */
  public menu(system: System, prefix: string): void {
    system.out(`${prefix} あいよ！!`);
    _.each(MenuMap, (info, name) => {
      system.out(`${name} : ${info.photo} : ${info.price}円`);
    });
  }

  /**
   * #### サブコマンド `order`
   * @param system
   * @param prefix
   * @param subOptions
   * @param subArgs
   */
  public order(
    system: System,
    prefix: string,
    subOptions: Types.Options,
    subArgs: string[],
    localStorage: LocalStoragePonyfill
  ): void {
    // 注文履歴を取得
    const orderHistory: Types.OrderLabel = JSON.parse(
      localStorage.getItem("order_history") || "{}"
    );
    // 注文数をカウント
    let counts: Types.OrderLabel = {};
    // 回転フラグ
    let isRoll: boolean = false;
    // オプションを解析
    if (subOptions) {
      for (const opKey of Object.keys(subOptions)) {
        switch (opKey) {
          // 一括注文
          case "-n":
            counts = OrderLabelSeparater.separate(subOptions[opKey] || "");
            break;
          // 回転
          case "-r":
            isRoll = true;
            break;

          default:
            break;
        }
      }
    }

    // 引数なしの場合は処理終了
    if (!subArgs) return;
    // 注文品をチェック
    const noLabels = Object.keys(counts).filter(v => !MenuMap[v]);
    const exists = subArgs.filter(v => EmojiConverter.convert(v, true));
    const noExists = subArgs
      .filter(v => !EmojiConverter.convert(v, true))
      .concat(noLabels)
      .join();
    // メニューにないものは削除
    _.each(noLabels, v => delete counts[v]);
    // メニューに無いものを注文した場合
    if (noExists.length > 0) {
      system.out(`${prefix} ${noExists} なんてのはメニューにないねぇ.`);
    }
    // 引数に同じものが複数注文された場合の考慮
    for (const item of exists) {
      counts[item] = counts[item] ? counts[item] + 1 : 1;
    }
    // all項目がある場合
    let allCount = 0;
    if ("all" in counts) {
      allCount = counts["all"] || 1;
      delete counts["all"];
    }
    // キャリー
    for (const meal of Object.keys(counts)) {
      const cssClass = isRoll ? "roll" : "";
      const count = allCount ? allCount : counts[meal];
      const oneMeal = `<span class="${cssClass}">${EmojiConverter.convert(
        meal
      )}</span>`;
      // 出力
      system.out(`${prefix} あいよ! ${meal} ${count}丁!`);
      system.out(`(´･ω･)つ ${oneMeal.repeat(count)}`);
      system.out(`&nbsp;`);
      // 注文数を注文履歴に残す
      if (!orderHistory[meal]) orderHistory[meal] = 0;
      orderHistory[meal] += count;
    }
    // ストレージに注文履歴を保存
    localStorage.setItem("order_history", JSON.stringify(orderHistory));
  }

  private doShowUsage(
    system: System,
    prefix: string,
    subCommand?: string,
    subArgs?: string[]
  ): boolean {
    const show = subCommand === undefined;
    if (show) {
      if (subArgs !== undefined && subArgs.length > 0) {
        system.out(
          `${prefix} '${
            subArgs[0]
          }' is not a taisyo command. See 'taisyo --help.'`
        );
      } else {
        system.out(`See 'taisyo --help.'`);
      }
    }
    return show;
  }

  public get subCommand(): string | undefined {
    return this.parsedArgs.subCommand;
  }

  public get subArgs(): string[] {
    return this.parsedArgs.subArgs;
  }

  public get subOptions(): Types.Options {
    return this.parsedArgs.subOptions;
  }

  public get prefix(): string {
    return `(´･ω･) `;
  }
}
