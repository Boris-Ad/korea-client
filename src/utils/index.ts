import { IPackages, IBasket, ISetCheckbox } from '../types';

export const setCurrent = (num: number) => {
  return num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
};

export function sortPackages(obj: IPackages) {
  const keys = Object.keys(obj) as Array<keyof IPackages>;
  const res = keys.sort((a, b) => Number(obj[a]) - Number(obj[b]));
  const myObj: IPackages = {};
  res.forEach((i, ind) => (ind === 0 ? (myObj[i] = 1) : (myObj[i] = 0)));
  return myObj;
}

export function incrementAndDecrement(max: 0 | 10, state: IBasket, id: number, pac: keyof IPackages) {
  const a = state.products;
  const b = a.find(i => i.id === id);

  if (b) {
    let c = Number(b.packages[pac]);
    if (max === 0) {
      b.packages[pac] = c > 0 ? c - 1 : 0;
    } else {
      b.packages[pac] = c < max ? c + 1 : max;
    }
  }
  return { products: a };
}

export function checkCheckbox(item: '100' | '500' | '1000', obj: ISetCheckbox) {
  const b = { ...obj, [item]: !obj[item] };
  for (let i in b) {
    const c = b[i as keyof typeof b];
    if (c === true) {
      return b;
    }
  }
  return obj;
}

export function actionErrors(formData: FormData, ignore: string = '') {
  const errors: string[] = [];
  const objectFormData = Object.fromEntries(formData);
  const keysFormData = Object.keys(objectFormData).filter(item => item !== ignore);

  keysFormData.map(key => {
    const value = formData.get(key);
    if (typeof value === 'string') {
      if (value.trim().length === 0) {
        errors.push(key);
      }
    }
  });

  return errors;
}

export function getPackagesFromFormData(formData: FormData) {
  const arrPackages: ['100гр.', '500гр.', '1000гр.', '1шт.'] = ['100гр.', '500гр.', '1000гр.', '1шт.'];
  const packages: IPackages = {};

  arrPackages.map(item => {
    if (formData.has(item)) {
      packages[item] = Number(formData.get(item));
    }
  });

  return packages;
}


