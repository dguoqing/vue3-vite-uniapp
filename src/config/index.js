export const devService = {
    demoService: 'https://xx.com', //测试环境

}

export const testService = {
    demoService: 'https://xx.com', //测试环境

}

export const preService = {
    demoService: 'https://xx.com', //生产环境

}

export const proService = {
    demoService: 'https://xx.com', //生产环境

}

export const getService = (name = 'demoService') => {
    switch (process.env.VITE_APP_ENV) {
        case 'dev':
            {
                return devService[name]
            }
            break
        case 'test':
            {
                return testService[name]
            }
            break
        case 'pre':
            {
                return preService[name]
            }
            break
        case 'prod':
            {
                return proService[name]
            }
            break
    }
}

// 输出日志信息
export const noConsole = false
