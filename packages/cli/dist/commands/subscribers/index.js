import { listSubscribersCommand } from "./list.js";
export function registerSubscriberCommands(program) {
    const subscribers = program
        .command("subscribers")
        .description("View subscriber data");
    subscribers.addCommand(listSubscribersCommand());
}
//# sourceMappingURL=index.js.map