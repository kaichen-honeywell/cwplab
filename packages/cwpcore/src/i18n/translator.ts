import { CwpTranslateService } from "../../../cwpinterface/src/index";

export class Translator implements CwpTranslateService {
    translateAsync(key: string, lang: string) {
        return Promise.resolve("");
    }
    translateWithValuesAsync(key: string, lang: string, ...values: any) {
        return Promise.resolve("");
    }

}