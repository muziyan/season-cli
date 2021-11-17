import { Command } from "commander/typings/index";
import { NewAction } from "../actions";
import { NewCommand } from "./new.command";

export class CommandLoader {
  public static load(program:Command):void{
    new NewCommand(new NewAction()).load(program)
  }
}