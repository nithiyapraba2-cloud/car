import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepreciationController } from './depreciation.controller';
import { DepreciationService } from './depreciation.service';
import { DepreciationRate } from './depreciation-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepreciationRate])],
  controllers: [DepreciationController],
  providers: [DepreciationService],
})
export class DepreciationModule {}
