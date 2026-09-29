import { Body, Controller, Post } from '@nestjs/common';
import { DepreciationService } from './depreciation.service';
import { CalculateDepreciationDto } from './calculate-depreciation.dto';

@Controller('depreciation')
export class DepreciationController {
  constructor(private readonly depreciationService: DepreciationService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateDepreciationDto) {
    return this.depreciationService.calculate(dto);
  }
}
