const connect = require("./connection")
const func = require("./functoin")

const query = {
    insert: (table, fileds, values) => {
        return `INSERT INTO ${table} (${fileds}) VALUES ('${values}')`;
    },
    selectWhere: (feild, data) => {
        return `SELECT * FROM users WHERE ${feild} = '${data}'`
    },
    updatejob: (jobdata, id) => {
        return `UPDATE job set job_title = '${jobdata.job_title}',job_title = '${jobdata.job_title}',job_description = '${jobdata.job_description}',area = '${jobdata.area}',city = '${jobdata.city}',state = '${jobdata.state}',country = '${jobdata.country}',company_name = '${jobdata.company_name}',status = '${jobdata.status}' WHERE id = '${jobdata.jid}'`;
    }
}

const insertuser = (data) => {
    let status = true
    const datauser = {
        sub: data.sub,
        name: data.name,
        email: data.email,
        number: data.phone,
        role: data.role,
        picture: data.picture,
    }


    if (datauser.number != "" && datauser.role != "") {
        connect.con.query(query.insert('users', Object.keys(datauser).toString(), Object.values(datauser).join("','")), (err) => {
            if (err) {
                console.log("duplicate entry")
            }
        })

    } else {
        status = false
    }
    return status
}

const updateJob = (data) => {
    let status = true
    const jobdata = {
        jid: data.jid,
        job_title: data.job_title,
        job_description: data.job_description,
        area: data.area,
        city: data.city,
        state: data.state,
        country: data.country,
        company_name: data.company_name,
        status: data.status,
    }

    if (func.isnotEmpty(Object.values(jobdata))) {
        connect.con.query(query.updatejob(jobdata), (err) => {
            if (err) {
                console.log("duplicate entry")
            }
        })

    } else { status = false }
    return status
}

const insertjob = (data) => {
    let status = true
    const jobdata = {
        userid: data.userid,
        job_title: data.job_title,
        job_description: data.job_description,
        area: data.area,
        city: data.city,
        state: data.state,
        country: data.country,
        company_name: data.company_name,
        status: data.status,
    }
    console.log(jobdata)
    if (func.isnotEmpty(Object.values(jobdata))) {
        connect.con.query(query.insert('job', Object.keys(jobdata).toString(), Object.values(jobdata).join("','")), (err) => {
            if (err) {
                console.log("duplicate entry")
            }
        })

    } else { status = false }
    return status
}


exports.insertuser = insertuser
exports.insertjob = insertjob
exports.updateJob = updateJob