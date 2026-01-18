interface User {
    id: number;
    username: string;
    email: string;
}

class UserAccount implements User {
    constructor (
        public id: number,
        public username: string, 
        public email: string
    ) {}

    public getProfile(): void {
        console.log(this.username);
        console.log(this.email);
    }
}

const user1 = new UserAccount(12345, "Damar", "damar@gmail.com");
user1.getProfile();