export interface ModelsStateInterface {
  prop: boolean;
}

function state(): ModelsStateInterface {
  return {
    prop: false,
  };
}

export default state;
