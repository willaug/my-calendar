import translate from '@core/functions/translate';

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
      lang: 'english',
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
      lang: 'pt-BR',
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
