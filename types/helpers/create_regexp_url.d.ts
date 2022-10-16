/**
 * @description #url yi alip istek geldiginde Endpoint path'i ile karsilastirabilmek icin regexpe ceviriyor
 *              #path undefined ise butun url ler ile eslestiriyor
 *              #"/user" =>  /^\/user$/
 * @param {string | undefined} path
 * @returns {RegExp}
 */
export declare const CreateRegexpurl: (path?: string) => RegExp;
//# sourceMappingURL=create_regexp_url.d.ts.map