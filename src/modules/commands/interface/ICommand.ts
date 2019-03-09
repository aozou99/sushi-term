import { Types } from "modules/constants/Types";

export interface ICommand {
  readonly MAIN_OPTIONS: Readonly<Types.Options>;
  readonly SUB_COMMANDS: ReadonlyArray<string>;
  readonly SUB_OPTIONS: Readonly<Types.Options>;
}
