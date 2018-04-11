// import 'reflect-metadata';
// import { IPractice } from './interfaces';

// import { IoCPractice_1, IoCPractice_2 } from './ioc/IoCPractice';
// import { TheBasics } from './ioc/TheBasics';
// import { ThreePractice_1 } from './three/ThreePractice_1';

import { IGame, GlobalContainer } from './game/Game';
import { TYPES } from './game/TYPES';

class Entry {
    public static main(): number {
        // let practice: IPractice;

        // practice = new IoCPractice_1;
        // practice = new TheBasics;
        // practice = new ThreePractice_1;

        // practice.init();

        let game = GlobalContainer.get<IGame>(TYPES.IGame);
        game.run();
        
        return 0;
    }
}

Entry.main();

