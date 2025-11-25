import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationsController } from './user-locations.controller';

describe('UserLocationsController', () => {
  let controller: UserLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLocationsController],
    }).compile();

    controller = module.get<UserLocationsController>(UserLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
