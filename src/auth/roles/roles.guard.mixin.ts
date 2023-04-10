// import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
// import { Role } from './roles.enum';
// import RequestWithUser from '../models/requestWithUser.interface';
// import { Reflector } from '@nestjs/core';

// const RoleGuard = (role: Role): Type<CanActivate> => {
//   class RoleGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//     canActivate(context: ExecutionContext) {
//       const { user } = context.switchToHttp().getRequest();

//       // return Object.values(role).includes(user?.roleId); //TODO: check if it works

//       const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//         context.getHandler(),
//         context.getClass(),
//       ]);

//       return requireRoles.some((role) => user.role.include(role));
//     }
//   }

//   return mixin(RoleGuardMixin);
// };

// export default RoleGuard;
