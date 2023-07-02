const AlipaySdk = require('alipay-sdk').default;
const alipaySdk = new AlipaySdk({

    appId: 2021000122604577, //
    signType:'RSA2',  //签名算法
    gateway: 'https://openapi.alipaydev.com/gateway.do',// 支付宝网关地址
    alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4XifxMz5hHKWEtAmZxEfTdi2hk0haqyDg8CBYicemM7+kUUuJKl0W/xbGQHl50Pi3g6zh5GBQxOBdeulcFrp0nX3bX1yspnrCD/u20c934IPBOj5XcwA0YwfBaNuYDEWdskEsCWXUF3CZA6hTzy4g40ZtSP1EbaqLYxVZrwCR68NUlOtAZfX9MhJyK5eURwRi/7FH2Yd2Sz1OSyMAvyIPOxCzgUFzw/1Q4W1WokxH2f+fiaN8Maa4gjDr2J+HJtHlgLXgdeNyOXYghPg0ApLuPMssydoRLC7ntc3O41pOW1PeKYocSAkEj7iUZ3KFV52BUB4FhLEQiGlDT+Wc9R3sQIDAQAB', //支付宝公钥
    privateKey:'MIIEowIBAAKCAQEAmQuzOGX8B+t+awJvj96tew8fJo42kgRqIaBMgNRBN1mAS76IlQa4tqMWJdHbOSZ/b51++Sn5sDPMJyZzu51gM4oFqoCLyKo96tizv0JDQHcD4EXlpxwZwUjcRUbbE2B0t6bK0g12KnA04fBHNzB7YU3xoj3/tX+g2SP9pawRc0WoGH8yRGW8AzY6M3ulK9v0duvG9nSK1odBG5hrvJvcl2ty/KWdybDBP5YbRCcYxxFJ2D8sFouumgc9g4gZR9B2LFy/IMUPHZwpnON4uPdFsbHeKeBd4JEzU3b5g37KonwlCfIZtXixaklH8SMol7y8MYfAV5duVCfRAogSxCkHvQIDAQABAoIBAFUD19GLbV4k5buhxcEgjDOgqcgsFYo1I5N8TSL/RR7u+8KXm51U94SUwXfOxD1R8lZZIbBdLdNAYraYuI9Ok6Ltl8onz/5u+ygaqnai42LK+f86NKEIjhH9XEarXoS7/voJj/7w9WQLooSjiZvRtafOuVxLnmD+/aXBRWQjWioyefF3yi5unoIDtsaZiyrtbqk2lYInuX/Q3K0CksNx3NCFX+CR3sNesZgs6H8JcEe/qFnixtRbNAvrZnDv1dg95hT0ayb66q6O/imqRXYAkgs6OWm4DLIWOy+iswIs6HBFjGR64hepMYZux6skLHdlNCYkaRaUDp84onI+RymvXaECgYEA1UeG9NV1AabRhy4oe1Xql16jlJ1MvllWAhgOI2aUEyJkGnoDC/Z9gM6TD7hTnoBzAZpf5n9jW3WWqbXi1O0qaiAkAsDXxSOIURt1qdAikHbxhefxV4sMS4C8XlwV8WOOH5J7SKYoZMkejgXBCopC2pgzNm7aMf8VH8kJHWv5IOkCgYEAt7OHUMbesPnLzdFK9zrpPp0WL+HB6iAHpf3JRt3B+K5t+ZmKQCkilD/wZgb/w1Dg3+IKVK4hfm4zykq6lu4q8UyNy07RTAUT7pwMjgX22RR+0Om8LjKQSAr/832mjqDEHrm0IbS9TuAZ5eCG55CP3AUnrhFZFaIdIxvUcY0My7UCgYEAkil3qnhSvHQHad3PLl796wiXkDSQsG5my/6SSd51oftSoPZ2+g7NiaWIESDgZWJf7nxONpecjsQyIVIeBpAWHi6ynxRripXESNlJtLuHxHtPH9aJhdYr8d5iuUPgYdI5RxfK10nPqupNv0TgO4nvMQFXL3menN7UKjlKvtgNHmkCgYBhJ8UINrWued6NEwUH7pNPdzs1xbuOPLRu2ONr5HrjMDWfzdGtj1Pnfk2BWHBKd2sHXYBDOvkh6dzgP1eh3YK+rdNMVHojL4hUKRoGvybHtqw/h27sK/fc8lxeBfVh96rh6StYrEN3BNUNnAsdS3qaTeunhytLYrrwR5a7G3NKBQKBgHamj/lW1IiYIq5AG2olMZCMERUrE2TvAAvpxCe2KJ8qhROzD9d14YltdBiY83g7mnkykeVoDpBlTylax6A+KE+GAx5VpaOT2CLRPbm8BCn1XYlkJGLzNXBVTWySZA5fjCfruOdakgwtWXVnzDzT6Dc3t4mTAl51oBusD+1tQImT' //应用私钥

})

module.exports = alipaySdk