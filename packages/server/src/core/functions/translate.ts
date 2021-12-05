import { Translate } from '@interfaces/functions/translate';

export default function translate(translateData: Translate): any {
  const langLowerCase = translateData.lang.toLowerCase();

  if (langLowerCase.includes('pt')) {
    return translateData.langData.portuguese;
  }

  return translateData.langData.english;
}
