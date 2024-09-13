export async function fetchTranslation(lang) {
    const cachedTranslation = sessionStorage.getItem(`translation_${lang}`);
    if (cachedTranslation)
        return JSON.parse(cachedTranslation);

    const response = await fetch(`../languages/${lang}.json`);
    if (!response.ok)
        throw new Error(`Failed to load translation file for language: ${lang}`);

    const translation = await response.json();
    sessionStorage.setItem(`translation_${lang}`, JSON.stringify(translation));

    return translation;
}
