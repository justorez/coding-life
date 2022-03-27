String.prototype.fakeTrim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
}
