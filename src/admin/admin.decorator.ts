import { SetMetadata } from '@nestjs/common';

export const AdminRequired = () => SetMetadata('adminRequired', true);
