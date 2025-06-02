import { Test, TestingModule } from '@nestjs/testing';
import { SnippetService } from './snippet.service';
import { getModelToken } from '@nestjs/mongoose';
import { Snippet } from './snippet.schema';

// OpenAI mock
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'Mocked summary.' } }],
          }),
        },
      },
    })),
  };
});

describe('SnippetService', () => {
  let service: SnippetService;
  let snippetModel: any;

  beforeEach(async () => {
    snippetModel = {
      save: jest.fn().mockResolvedValue({
        text: 'Test text',
        summary: 'Mocked summary.',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnippetService,
        {
          provide: getModelToken(Snippet.name),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          useValue: jest.fn(() => snippetModel),
        },
      ],
    }).compile();

    service = module.get<SnippetService>(SnippetService);

    // Model mock constructor
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (service as any).snippetModel = function (data: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        save: snippetModel.save,
      };
    };
  });

  it('should create a snippet with summary', async () => {
    const result = await service.create('Test text');
    expect(result.text).toBe('Test text');
    expect(result.summary).toBe('Mocked summary.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(snippetModel.save).toHaveBeenCalled();
  });
});
