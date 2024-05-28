import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { dbConstants } from '../constants/dbConstants';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(dbConstants.REPORT_REPOSITORY)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(reportDto);
    report.user = user;

    return this.reportRepository.save(report);
  }

  async changeApproval(id: string, isApproved: boolean) {
    const report = await this.reportRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.isApproved = isApproved;

    return this.reportRepository.save(report);
  }

  async createEstimate(query: GetEstimateDto) {
    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .andWhere('isApproved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
