import { JwtService } from '@modules/auth/account/core/services/jwt.service';
import { sign } from 'jsonwebtoken';

export class JwtServiceImpl implements JwtService {
  public async createShortLiveToken(email: string, id: string, type: string): Promise<string> {
    return sign({ email, id, type }, process.env.JWT_SHORT_SECRET, { expiresIn: '24h' });
  }

  public async createLongLiveToken(email: string): Promise<string> {
    return sign({ email }, process.env.JWT_LONG_SECRET, { expiresIn: '7d' });
  }
}
