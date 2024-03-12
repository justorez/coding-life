/**
 * pnpm 工作空间
 * https://pnpm.io/zh/workspaces
 */

function sleep(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
    sleep
}
