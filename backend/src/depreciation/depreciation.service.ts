import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepreciationRate } from './depreciation-rate.entity';
import { CalculateDepreciationDto } from './calculate-depreciation.dto';

@Injectable()
export class DepreciationService implements OnModuleInit {
  constructor(
    @InjectRepository(DepreciationRate)
    private readonly rateRepo: Repository<DepreciationRate>,
  ) {}

  // Fills the table with starting rates if it's empty
  async onModuleInit() {
    const count = await this.rateRepo.count();
    if (count === 0) {
      await this.rateRepo.save([
        { category: 'hatchback', firstYearRate: 0.15, yearlyRate: 0.1 },
        { category: 'sedan', firstYearRate: 0.18, yearlyRate: 0.12 },
        { category: 'suv', firstYearRate: 0.16, yearlyRate: 0.11 },
        { category: 'luxury', firstYearRate: 0.22, yearlyRate: 0.15 },
      ]);
    }
  }

  async calculate(dto: CalculateDepreciationDto) {
    const { price, purchaseYear, condition, category } = dto;

    const rate = await this.rateRepo.findOne({ where: { category } });
    if (!rate) {
      throw new NotFoundException(`No rates found for category "${category}"`);
    }

    const yearly: { year: number; value: number }[] = [];
    let value = price;

    for (let i = 1; i <= 10; i++) {
      const r =
        condition === 'new' && i === 1 ? rate.firstYearRate : rate.yearlyRate;
      value = value * (1 - r);
      yearly.push({ year: purchaseYear + i, value: Math.round(value) });
    }

    const after5Years = yearly[4].value;
    const after10Years = yearly[9].value;

    return {
      price,
      condition,
      category,
      after5Years,
      after10Years,
      lossAfter5Years: price - after5Years,
      lossAfter10Years: price - after10Years,
      yearly,
    };
  }
}
