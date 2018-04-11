import {
    injectable,
    inject,
    Container
} from 'inversify';
import { IPractice } from '../interfaces';

interface Warrior {
    fight(): string;
    sneak(): string;
}

interface Weapon {
    hit(): string;
}

interface ThrowableWeapon {
    throw(): string;
}

const TYPES = {
    Warrior: Symbol.for('Warrior'),
    Weapon: Symbol.for('Weapon'),
    ThrowableWeapon: Symbol.for('ThrowableWeapon')
};

@injectable()
class Katana implements Weapon {
    public hit(): string {
        return 'cut!';
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw(): string {
        return 'hit!';
    }
}

@injectable()
class Ninja implements Warrior {

    // case 1
    // private _katana: Weapon;
    // private _shuriken: ThrowableWeapon;
    // public constructor(
    //     @inject(TYPES.Weapon) katana: Weapon,
    //     @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    // ) {
    //     this._katana = katana;
    //     this._shuriken = shuriken;
    // }

    //case 2
    @inject(TYPES.Weapon)
    private _katana: Weapon;
    @inject(TYPES.ThrowableWeapon)
    private _shuriken: ThrowableWeapon;

    public fight(): string {
        return this._katana.hit();
    }
    public sneak(): string {
        return this._shuriken.throw();
    }
}

class TheBasics implements IPractice {
    public init(): void {
        let container = new Container;
        container.bind<Warrior>(TYPES.Warrior).to(Ninja);
        container.bind<Weapon>(TYPES.Weapon).to(Katana);
        container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

        let ninja = container.get<Ninja>(TYPES.Warrior);
        console.log(ninja.fight(), ninja.sneak());
    }
}

export { TheBasics };