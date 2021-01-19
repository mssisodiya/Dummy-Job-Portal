const token = localStorage.getItem("token");
export const user = jwt.verify(token, "jwtPrivateKey");
