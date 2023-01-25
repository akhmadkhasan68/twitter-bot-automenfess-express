import { IDIContainer } from "rsdi";
import { DirectMessageController } from "../controllers/direct-message.controller";
import * as core from 'express-serve-static-core';

export default function configureRouter(app: core.Express, diContainer: IDIContainer) {
    const direcMessageController = diContainer.get(DirectMessageController);
    const directMessageRoute = app.route('/direct-message');
    directMessageRoute.get(direcMessageController.listDirectMessage.bind(direcMessageController));
}
