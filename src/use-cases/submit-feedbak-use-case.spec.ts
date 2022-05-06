import { SubmitFeedbackUseCase } from "./submit-feedbak-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "example teste",
      screenshot: "data:image/png;base64,dsdsdsd"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feeedback without type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "example teste",
      screenshot: "data:image/png;base64,dsdsdsd"
    })).rejects.toThrow();
  });

  it('should not be able to submit feeedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,dsdsdsd"
    })).rejects.toThrow();
  });

  it('should not be able to submit feeedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "example teste",
      screenshot: "teste.jpg"
    })).rejects.toThrow();
  });
});