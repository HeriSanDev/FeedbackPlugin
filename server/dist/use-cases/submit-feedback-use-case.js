"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbacksRespository, mailAdapter) {
        this.feedbacksRespository = feedbacksRespository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error('Type is Required');
        }
        if (!comment) {
            throw new Error('Comment is Required');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format.");
        }
        await this.feedbacksRespository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color:#111";>`,
                `<p>Tipo do feedback: ${type} </p>`,
                `<p>Comentário: ${comment} </p>`,
                screenshot ? `<img src=${screenshot} />` : null,
                `</div>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
