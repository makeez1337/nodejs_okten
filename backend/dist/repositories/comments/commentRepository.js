"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    async getCommentByUserId(userId) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :userId', { userId })
            .innerJoinAndSelect('comment.post', 'post')
            .getMany();
    }
    async updateByAction(action, actionId) {
        if (action === 'dislike') {
            return (0, typeorm_1.getManager)().getRepository(entity_1.Comment)
                .increment({ id: Number(actionId) }, 'dislikes', '1');
        }
        if (action === 'like') {
            return (0, typeorm_1.getManager)().getRepository(entity_1.Comment)
                .increment({ id: Number(actionId) }, 'likes', '1');
        }
    }
};
CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.Comment)
], CommentRepository);
exports.commentRepository = new CommentRepository();
//# sourceMappingURL=commentRepository.js.map