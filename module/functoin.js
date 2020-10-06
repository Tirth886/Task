const isnotEmpty = (data) => {
    data.forEach(element => {
        if (element == "") {
            status = false
            return false
        }
    });

    return true
}

exports.isnotEmpty = isnotEmpty