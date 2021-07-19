module.exports = {
 moduleFileExtensions: ["js", "ts", "json", "vue"],
 moduleNameMapper: {
  "^@/(.*)$": "src/src/$1",
  "vuetify/lib(.*)": "src/node_modules/vuetify/es5$1",
 },
 modulePaths: ["src/src", "src/node_modules"],
 transform: {
  ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  "^.+\\.ts?$": "ts-jest",
  ".*\\.(vue)$": "vue-jest",
 },
 transformIgnorePatterns: ["src/node_modules/(?!(vuetify)/)", "/node_modules/(?!@ionic/vue|@ionic/vue-router)"],
 testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
 setupFilesAfterEnv: ["src/tests/unit/setup.ts"],
 preset: "ts-jest",
};
