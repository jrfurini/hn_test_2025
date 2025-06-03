import { Test, TestingModule } from '@nestjs/testing';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';
import { NotFoundException } from '@nestjs/common';

const mockSnippet = {
  _id: '507f1f77bcf86cd799439011',
  text: 'Test text',
  summary: 'Mocked summary.',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('SnippetController', () => {
  let controller: SnippetController;
  let service: SnippetService;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn().mockResolvedValue(mockSnippet),
      findById: jest.fn().mockImplementation((id: string) => {
        if (id === mockSnippet._id) return Promise.resolve(mockSnippet);
        return Promise.resolve(null);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetController],
      providers: [{ provide: SnippetService, useValue: serviceMock }],
    }).compile();

    controller = module.get<SnippetController>(SnippetController);
    service = module.get<SnippetService>(SnippetService);
  });

  describe('POST /snippets', () => {
    it('should create a snippet with valid text', async () => {
      const dto = { text: 'Test text' };
      const result = await controller.createSnippet(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith('Test text');
      expect(result.text).toBe('Test text');
      expect(result.summary).toBe('Mocked summary.');
    });

    it('should handle empty text (if not allowed)', async () => {
      (service.create as jest.Mock).mockRejectedValueOnce(
        new Error('Text is required'),
      );
      await expect(controller.createSnippet({ text: '' })).rejects.toThrow(
        'Text is required',
      );
    });

    it('should handle OpenAI error gracefully', async () => {
      (service.create as jest.Mock).mockRejectedValueOnce(
        new Error('OpenAI error'),
      );
      await expect(
        controller.createSnippet({ text: 'Test text' }),
      ).rejects.toThrow('OpenAI error');
    });
  });

  describe('GET /snippets/:id', () => {
    it('should return a snippet for a valid id', async () => {
      const result = await controller.getSnippet(mockSnippet._id);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findById).toHaveBeenCalledWith(mockSnippet._id);
      expect(result).toEqual(mockSnippet);
    });

    it('should return NotFoundException for a non-existent id', async () => {
      await expect(
        controller.getSnippet('000000000000000000000000'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
