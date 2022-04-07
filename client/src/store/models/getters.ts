import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ModelsStateInterface } from './state';

const getters: GetterTree<ModelsStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
