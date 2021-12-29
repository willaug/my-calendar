import { Translate } from '@interfaces/functions/translate';

export default function translate(translateData: Translate): any {
  if (translateData.lang === 'pt_br') {
    return translateData.langData.portuguese;
  }

  return translateData.langData.english;
}
