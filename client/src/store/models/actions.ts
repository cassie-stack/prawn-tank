import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ModelsStateInterface } from './state';

const actions: ActionTree<ModelsStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
