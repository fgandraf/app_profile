export async function fetchTranslation(lang) {
    const cachedTranslation = localStorage.getItem(`translation_${lang}`);
    if (cachedTranslation) {
        // console.log('Translation loaded from cache');
        return JSON.parse(cachedTranslation);
    }

    const response = await fetch(`../languages/${lang}.json`);
    if (!response.ok) {
        throw new Error(`Failed to load translation file for language: ${lang}`);
    }

    const translation = await response.json();
    localStorage.setItem(`translation_${lang}`, JSON.stringify(translation));
    // console.log('Translation loaded from file');
    return translation;
}
