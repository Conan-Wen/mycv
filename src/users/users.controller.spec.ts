// import { NotFoundException } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from '../auth/auth.service';
// import { User } from './user.entity';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// describe('UsersController', () => {
//     let controller: UsersController;
//     let fakeUsersService: Partial<UsersService>;
//     let fakeAuthService: Partial<AuthService>;

//     beforeEach(async () => {
//         fakeUsersService = {
//             findOne: (id: string) => Promise.resolve({ id, email: 'abc@cde.com', password: 'abc' } as User),
//             find: (email: string) => Promise.resolve([{ id: '1', email, password: 'abc' } as User]),
//             // remove: () => {},
//             // update: () => {}
//         };

//         fakeAuthService = {
//             // signup: () => {},
//             signin: (email: string, password: string) => Promise.resolve({ id: '1', email, password } as User),
//         };
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [UsersController],
//             providers: [
//                 {
//                     provide: UsersService,
//                     useValue: fakeUsersService,
//                 },
//                 {
//                     provide: AuthService,
//                     useValue: fakeAuthService,
//                 },
//             ],
//         }).compile();

//         controller = module.get<UsersController>(UsersController);
//     });

//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//     });

//     it('findAllUsers returns a list of users with the given email', async () => {
//         const users = await controller.findAllUsers('abc@cbd.com');

//         expect(users.length).toEqual(1);
//         expect(users[0].email).toEqual('abc@cbd.com');
//     });

//     it('findUser returns a single user with a given id', async () => {
//         const user = await controller.findUser('1');

//         expect(user).toBeDefined();
//     });

//     it('findUser throws an error if user with given id is not found', async () => {
//         fakeUsersService.findOne = () => Promise.resolve(null);

//         await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
//     });

//     it('signin updates session object and return user', async () => {
//         const session = { userId: undefined };
//         const user = await controller.signin({ email: 'abc@cbd.com', password: 'abc' }, session);

//         expect(user.id).toEqual('1');
//         expect(session.userId).toEqual('1');
//     });
// });
