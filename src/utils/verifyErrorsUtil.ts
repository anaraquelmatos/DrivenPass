async function verifyParam(id: number) {
    if (!id) {
        throw {
            type: "unauthorized",
            message: "Invalid param!"
        }
    }
}

const verifyErrors = {
    verifyParam
}

export default verifyErrors;