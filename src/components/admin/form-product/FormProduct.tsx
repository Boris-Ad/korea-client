import React from 'react';
import { useFetcher } from 'react-router-dom';
import { useSetFileName } from '../../../store';
import { ISetCheckbox } from '../../../types';
import { checkCheckbox } from '../../../utils';
import CustomButton from '../../ui/CustomButton';
import CustomCheckbox from '../../ui/CustomCheckbox';
import CustomFile from '../../ui/CustomFile';
import CustomInput from '../../ui/CustomInput';
import CustomRadio from '../../ui/CustomRadio';
import './style.scss'

const FormProduct: React.FC = () => {
  const fetcher = useFetcher();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [valueBoxOne, setValueBoxOne] = React.useState('1');
  const [valueBoxTwo, setValueBoxTwo] = React.useState<ISetCheckbox>({ '100': true, '500': false, '1000': false });

  const arrCheckbox: ['100', '500', '1000'] = ['100', '500', '1000'];
  const setFileName = useSetFileName(state => state.setFileName);

  React.useEffect(() => {
    if (fetcher.state === 'loading' && fetcher.data === 'ok') {
      formRef.current?.reset();
      setFileName();
    }
  }, [fetcher]);

  return (
    <fetcher.Form ref={formRef} method="post" className="form" encType="multipart/form-data">
      <CustomInput label="Название" name="name" error={fetcher.data} />
      <div className="radio-box-one">
        <CustomRadio value="1" label="Штучно" checked={valueBoxOne} onChange={e => setValueBoxOne(e.target.value)} />
        <CustomRadio value="2" label="Вес" checked={valueBoxOne} onChange={e => setValueBoxOne(e.target.value)} />
      </div>
      {valueBoxOne === '2' ? (
        <>
          <div className="radio-box-two">
            {arrCheckbox.map(item => (
              <CustomCheckbox
                key={item}
                label={item + 'гр'}
                checked={valueBoxTwo[item]}
                onChange={() => setValueBoxTwo(prev => checkCheckbox(item, prev))}
              />
            ))}
          </div>
          {valueBoxTwo[100] && (
            <CustomInput label="Цена за 100гр:(руб)" name="100гр." type="number" error={fetcher.data} />
          )}
          {valueBoxTwo[500] && (
            <CustomInput label="Цена за 500гр:(руб)" name="500гр." type="number" error={fetcher.data} />
          )}
          {valueBoxTwo[1000] && (
            <CustomInput label="Цена за 1000гр:(руб)" name="1000гр." type="number" error={fetcher.data} />
          )}
        </>
      ) : (
        <CustomInput label="Цена за 1шт:(руб)" name="1шт." error={fetcher.data} type="number" />
      )}

      <CustomFile label="Фотография" error={fetcher.data} name={'img'} />
      <CustomButton disabled={fetcher.state === 'submitting' ? true : false}>Добавить</CustomButton>
    </fetcher.Form>
  );
};

export default FormProduct;
