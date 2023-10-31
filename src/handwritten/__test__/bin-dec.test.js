const { decToBin, binToDec } = require('../bin-dec')

test('十进制二进制互相转换', () => {
    let bin = decToBin(0.1)
    let dec = binToDec(bin)
    // console.log(dec, bin, binToDec(bin))
    expect(dec).toBe(0.1)

    bin = decToBin(0.2)
    dec = binToDec(bin)
    expect(dec).toBe(0.2)

    bin = decToBin(3)
    dec = binToDec(bin)
    // console.log(dec, bin, binToDec(bin))
    expect(dec).toBe(3)

    bin = decToBin(13.5)
    dec = binToDec(bin)
    // console.log(dec, bin, binToDec(bin))
    expect(dec).toBe(13.5)
})
