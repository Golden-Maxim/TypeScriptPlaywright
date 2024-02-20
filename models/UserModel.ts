export class User {
    private _id: number;
    private _email: string;
    private _first_name: string;
    private _last_name: string;
    private _avatar: string;

    constructor(data: any) {
        this._id = data.id;
        this._email = data.email;
        this._first_name = data.first_name;
        this._last_name = data.last_name;
        this._avatar = data.avatar;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }
}