import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';

@Injectable()
export class ExampleService {
  constructor(private apiService: ApiService) {}

  async print(): Promise<string> {
    const data = await this.apiService.getFeedbacks();
    console.log(data);
    return 'success';
  }
}
