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

module.exports = {
    globals: {
        APP_BASENAME: "user-portal",
        SERVER_HOST_DEFAULT: "https://milogindev.ice.ibmcloud.com",
        APP_HOME_PATH: "/overview",
        APP_LOGIN_PATH: "/login",
        CLIENT_ID_DEFAULT: "4b6d414f-abb6-4db7-9112-7afc561c8e86",
        CLIENT_HOST_DEFAULT: "https://localhost:9000",
        LOGIN_CALLBACK_URL: "https://localhost:9000/user-portal/login"
    },
    transform: {
        "^.+\\.tsx$": "ts-jest",
        "^.+\\.ts$": "ts-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/test-configs/file-mock.js",
        "\\.(css|less)$": "<rootDir>/test-configs/style-mock.js"
    },
    setupFilesAfterEnv: ["<rootDir>/test-configs/setup-test.ts"]
};
