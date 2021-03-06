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
import { CustomAttribute } from './customAttribute';
import { LinkedAccount } from './linkedAccount';


export interface CICCustomUserResponse {
    /**
     * Indicates the realm used for the last login for the current user entry.
     */
    lastLoginRealm?: string;
    /**
     * The realm to which the user belongs. It is always \"cloudIdentityRealm\" for non-federated users.
     */
    realm?: string;
    /**
     * Indicates the time of the last login for the current user entry.  Value is a date and time of the form yyyy-mm-ddThh:mm:ssZ.
     */
    lastLogin?: string;
    /**
     * A timestamp that indicates when the user's email was verified.
     */
    emailVerified?: string;
    /**
     * Indicates the login type used for the last login for the current user entry.
     */
    lastLoginType?: string;
    /**
     * A field that indicates a list of timestamps at which the user attempted to see extended or grace time. The value of this field is in milliseconds and is read-only.
     */
    pwdGraceUseTime?: Array<string>;
    /**
     * The linked accounts for the user.
     */
    linkedAccounts?: Array<LinkedAccount>;
    /**
     * Indicates whether the password is reset for the current user entry. This value is read-only.
     */
    pwdReset?: boolean;
    /**
     * A field that indicates the timestamp at which the user's password was locked. The value of this field is in milliseconds and is read-only.
     */
    pwdAccountLockedTime?: string;
    /**
     * A field that indicates a list of timestamps at which the user attempted to log in with the wrong password The value of this field is in milliseconds and is read-only.
     */
    pwdFailureTime?: Array<string>;
    /**
     * The user category.
     */
    userCategory?: CICCustomUserResponse.UserCategoryEnum;
    /**
     * The custom attributes for the user. For the GET /Users API, custom attributes can be referenced by using the fully qualified name. The schema URI is urn:ietf:params:scim:schemas:extension:ibm:2.0:User:customAttributes.scimName, where scimName is the SCIM name of the custom schema attribute that was created with the POST /Schema/attributes API.
     */
    customAttributes?: Array<CustomAttribute>;
    /**
     * Indicates whether two factory authentication is required. It defaults to \"false\" if not provided.
     */
    twoFactorAuthentication?: boolean;
    /**
     * Indicates the time when the password was changed for the current user entry. This value is read-only.
     */
    pwdChangedTime?: number;
    /**
     * An unqualified, federated user name. This field is read-only.
     */
    unqualifiedUserName?: string;
    /**
     * A field that indicates the timestamp at which the user's password expiration is set. The value of this field is in milliseconds and is read-only.
     */
    pwdExpirationWarned?: string;
    /**
     * The \"id\" of the entry to which approval and re-certification records assigned to this identity will be delegated.
     */
    delegate?: string;
}

export namespace CICCustomUserResponse {
    export type UserCategoryEnum = 'regular' | 'federated';
    export const UserCategoryEnum = {
        Regular: 'regular' as UserCategoryEnum,
        Federated: 'federated' as UserCategoryEnum
    };
}
