/**
 * IBM Cloud Identity API
 * Use these API definitions to develop and integrate applications with the IBM Cloud Identity services such as authentication, customization, users and groups management, and others.  A new version of the API will be released if there are attributes that are removed or renamed. New resources, parameters, or attributes can be added without advance notice. When you use these APIs, ignore the unrecognized response parameters.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Name { 
    /**
     * The middle name(s) of the user. Maximum length is 80 characters.
     */
    middleName?: string;
    /**
     * The given name of the user, or first name in most Western languages. For example, Barbara is the given name from the full name Ms. Barbara J Jensen, PhD. Maximum length is 80 characters.
     */
    givenName?: string;
    /**
     * The family name of the user, or the last name in most Western languages. For example, Jensen is the family name from the full name Ms. Barbara J Jensen, PhD. Maximum length is 80 characters.
     */
    familyName?: string;
    /**
     * The full name of the user that includes all  user names, middle names, and suffixes, that are formatted for display. This value is returned by the service provider if it is not part of the POST or PUT payloads. If the POST or PUT JSON payload contains the value for this attribute, the value in the payload takes precedence. Maximum length is 240 characters.
     */
    formatted?: string;
}
