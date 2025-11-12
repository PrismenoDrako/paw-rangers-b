import { Test, TestingModule } from '@nestjs/testing';
import { DoctypesController } from './doctypes.controller';

describe('DoctypesController', () => {
  let controller: DoctypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctypesController],
    }).compile();

    controller = module.get<DoctypesController>(DoctypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
