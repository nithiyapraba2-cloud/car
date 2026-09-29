export class CalculateDepreciationDto {
  price: number;
  purchaseYear: number;
  condition: 'new' | 'used';
  category: string;
}
