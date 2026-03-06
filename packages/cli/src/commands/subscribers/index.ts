import { Command } from "commander";
import { listSubscribersCommand } from "./list.js";

export function registerSubscriberCommands(program: Command): void {
    const subscribers = program
        .command("subscribers")
        .description("View subscriber data");

    subscribers.addCommand(listSubscribersCommand());
}
