import { Command} from 'commander/typings/index';
import { AbstractAction } from "../actions/abstract.action";

export abstract class AbstractCommand{
  constructor(protected action: AbstractAction){}

  public abstract load(program: Command): void
}