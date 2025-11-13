export class VerificationHelper{
    static generateCode(digits: number){
        const code: string[] = []
        for (let i=0;i<digits;i++){
            var random_digit: string = Math.floor(Math.random()*10).toString()
            code.push(random_digit)
        }
        return code.join('')
    }
}