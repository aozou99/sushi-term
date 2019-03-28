import { OrderLabelSeparater } from "modules/separaters/OrderLabelSeparater";
import { Types } from "modules/constants/Types";

describe("OrderLabelSeparater", () => {
  describe("separete()", () => {
    it("正常にラベルからオブジェクトに変換できていること", () => {
      const text = "label1:100";
      const ans: Types.OrderLabel = { label1: 100 };
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
    it("正常に複数のラベルを認識し、オブジェクトに変換できていること", () => {
      const text = "label1:100,label2:200,label3:300";
      const ans: Types.OrderLabel = { label1: 100, label2: 200, label3: 300 };
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
    it("ラベル値が数字でない場合は、1として扱われること", () => {
      const text = "label1:100n";
      const ans: Types.OrderLabel = { label1: 1 };
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
    it("ラベルがなく数値だけの場合は、allというラベルに数値が設定されていること", () => {
      const text = "100";
      const ans: Types.OrderLabel = { all: 100 };
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
    it("ラベルがなく文字列だけの場合は、変換が行われていないこと", () => {
      const text = "100n";
      const ans: Types.OrderLabel = {};
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
    it("ラベルのフォーマットが不正な場合は、変換が行われていないこと", () => {
      const text = "label:100:100";
      const ans: Types.OrderLabel = {};
      const act = OrderLabelSeparater.separate(text);
      expect(act).toEqual(ans);
    });
  });
});
