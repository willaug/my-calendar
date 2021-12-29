import translate from '@core/functions/utils/translate';

const data = {
  english: {
    TITLE: 'Good morning!',
  },
  portuguese: {
    TITLE: 'Bom dia!',
  },
};

describe('Translate', () => {
  test('Translate function with english language should return successful', () => {
    const translatedData = translate({
      lang: 'en',
      langData: {
        english: data.english,
        portuguese: data.portuguese,
      },
    });

    expect(translatedData).toStrictEqual({
      TITLE: 'Good morning!',
    });
  });

  test('Translate function with portuguese language should return successful', () => {
    const translatedData = translate({
      lang: 'pt_br',
      langData: {
        english: data.english,
        portuguese: data.portuguese,
      },
    });

    expect(translatedData).toStrictEqual({
      TITLE: 'Bom dia!',
    });
  });
});
