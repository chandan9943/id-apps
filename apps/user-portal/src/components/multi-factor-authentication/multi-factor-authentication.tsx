/**
 * Copyright (c) 2019, cic (http://www.cic.org) All Rights Reserved.
 *
 * cic licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { List } from "semantic-ui-react";
import { AUTHENTICATOR_APP, FIDO, MULTI_FACTOR_AUTHENTICATION, SECURITY, SMS } from "../../constants";
import { AppConfig } from "../../helpers";
import { AlertInterface } from "../../models";
import { checkEnabled } from "../../utils";
import { SettingsSection } from "../shared";
import { FIDOAuthenticator, SMSOTPAuthenticator, TOTPAuthenticator } from "./authenticators";

/**
 * Prop types for the basic details component.
 */
interface MfaProps {
    onAlertFired: (alert: AlertInterface) => void;
}

export const MultiFactorAuthentication: React.FunctionComponent<MfaProps> = (props: MfaProps): JSX.Element => {
    const { t } = useTranslation();
    const { onAlertFired } = props;
    const multiFactorConfig = useContext(AppConfig)[SECURITY][MULTI_FACTOR_AUTHENTICATION];

    return (
        <SettingsSection description={ t("views:sections.mfa.description") } header={ t("views:sections.mfa.heading") }>
            <List divided={ true } verticalAlign="middle" className="main-content-inner">
                <List.Item className="inner-list-item">
                    {
                        checkEnabled(multiFactorConfig, SMS)
                            ? (
                                <SMSOTPAuthenticator onAlertFired={ onAlertFired } />
                            )
                            : null
                    }
                </List.Item>
                <List.Item className="inner-list-item">
                    {
                        checkEnabled(multiFactorConfig, FIDO)
                            ? (
                                <FIDOAuthenticator onAlertFired={ onAlertFired } />
                            )
                            : null
                    }
                </List.Item>
                <List.Item className="inner-list-item">
                    {
                        checkEnabled(multiFactorConfig, AUTHENTICATOR_APP)
                            ? (
                                <TOTPAuthenticator onAlertFired={ onAlertFired } />
                            )
                            : null
                    }
                </List.Item>
            </List>
        </SettingsSection>
    );
};
