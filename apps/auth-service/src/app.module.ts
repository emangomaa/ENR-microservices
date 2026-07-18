import { Module } from "@nestjs/common";
import { AuthServiceModule } from "./auth/auth.module";

@Module({
  imports: [AuthServiceModule],
})
export class AppModule {}