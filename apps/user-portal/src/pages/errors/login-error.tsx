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

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { EmptyPlaceholder } from "../../components/shared";
import { EmptyPlaceholderIllustrations } from "../../configs";
import { ErrorPageLayout } from "../../layouts";

/**
 * Login error page.
 *
 * @return {JSX.Element}
 */
export const LoginErrorPage = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <ErrorPageLayout>
            <EmptyPlaceholder
                action={ (
                    <Button
                        className="link-button"
                        as={ Link }
                        to={ APP_LOGOUT_PATH }
                    >
                        { t("views:placeholders.loginError.action") }
                    </Button>
                ) }
                image={ EmptyPlaceholderIllustrations.loginError }
                imageSize="tiny"
                subtitle={ [
                    t("views:placeholders.loginError.subtitles.0"),
                    t("views:placeholders.loginError.subtitles.1"),
                ] }
                title={ t("views:placeholders.loginError.title") }
            />
        </ErrorPageLayout>
    );
};
