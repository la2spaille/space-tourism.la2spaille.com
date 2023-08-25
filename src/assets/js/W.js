window.W = {}

W = class {
    static get w() {
        return innerWidth
    }

    static get hW() {
        return innerWidth / 2
    }

    static get h() {
        return innerHeight
    }

    static get hH() {
        return innerHeight / 2
    }
}