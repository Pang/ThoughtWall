import { Action } from '@ngrx/store';
import { ModelToken } from '../../../_models/ModelToken';

export const CHANGE_THREAD = 'CHANGE_THREAD';

export class ChangeThread implements Action {
    readonly type = CHANGE_THREAD;
    constructor(public payload: any) {}
}
