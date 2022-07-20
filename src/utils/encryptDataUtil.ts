import bcrypt from "bcrypt";
import Cryptr from "cryptr";

async function encryptDataBcrypt(data: string) {
    const NUMBER = 10;
    const encrypted = bcrypt.hashSync(data, NUMBER);
    return encrypted;
}

async function encryptDataCryptr(info: string) {
    const data = new Cryptr(process.env.KEY);
    const dataEncrypted = data.encrypt(info);
    return {
        dataEncrypted
    };
}

const encryptData = {
    encryptDataBcrypt,
    encryptDataCryptr
}

export default encryptData;