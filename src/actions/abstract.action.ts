import { Input } from "../commands";

export abstract class AbstractAction{
  public abstract handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: String[]
  ):Promise<void>
}