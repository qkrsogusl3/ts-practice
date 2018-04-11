
import {
    Container,
    injectable,
    inject
} from 'inversify';

import getDecorators from 'inversify-inject-decorators';
import { IPractice } from '../interfaces';

@injectable()
class Katana {
    public hit(): string {
        return 'cut!';
    }
}

@injectable()
class Shuriken {
    public throw(): string {
        return 'hit!';
    }
}

@injectable()
class Ninja implements Ninja {
    private _katana: Katana = null;
    private _shuriken: Shuriken = null;

    public katana(): Katana {
        return this._katana;
    }
    public shuriken(): Shuriken {
        return this._shuriken;
    }

    public constructor(katana: Katana, shuriken: Shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight(): string {
        return this._katana.hit();
    }
    public sneak(): string {
        return this._shuriken.throw();
    }
}

class IoCPractice_1 implements IPractice {
    public init(): void {

        let container = new Container();
        container.bind<Ninja>(Ninja).to(Ninja);
        container.bind<Katana>(Katana).to(Katana);
        container.bind<Shuriken>(Shuriken).to(Shuriken);

        let ninja_1 = container.get(Ninja);
        console.log(ninja_1 === ninja_1);
        let ninja_2 = container.get(Ninja);
        console.log(ninja_1 === ninja_2);

        console.log(ninja_1.katana === ninja_2.katana);

    }
}

let container = new Container();
let { lazyInject } = getDecorators(container);
@injectable()
class Dom {
    public domUi: DomUi;
    constructor(domUi: DomUi) {
        this.domUi = domUi;
    }
}
@injectable()
class DomUi {
    @lazyInject(Dom) public dom: Dom;
}
@injectable()
class Test {
    constructor(dom: Dom) {
        console.log(dom);
    }
}
class IoCPractice_2 implements IPractice {
    public init(): void {
        container.bind(Dom).toSelf().inSingletonScope();
        container.bind(DomUi).toSelf().inSingletonScope();
        let dom = container.resolve(Test);
    }
}

export {
    IoCPractice_1,
    IoCPractice_2
};