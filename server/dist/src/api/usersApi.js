var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
function createUsers(username, password, email, phoneNumber, birthDate, postcode, gender, profilePicture, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield prisma.user.create({
                data: {
                    username,
                    password,
                    email,
                    phoneNumber,
                    gender,
                    postcode,
                    profilePicture,
                    birthDate,
                    role: {}
                }
            });
        }
        catch (error) {
            console.error("failed to create new user");
            throw error;
        }
    });
}
export default createUsers;
