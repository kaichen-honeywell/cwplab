export interface CwpTranslateService {
  translateAsync: (key: string, lang: string) => Promise<string>;
  translateWithValuesAsync: (
    key: string,
    lang: string,
    ...values: string[]
  ) => Promise<string>;
}
