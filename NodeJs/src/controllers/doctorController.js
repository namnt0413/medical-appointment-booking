import doctorService from '../services/doctorService'


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit =10;

    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1, 
            errMessage: 'Error from server'
        })
    }

}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)

    } catch (error) {
        return res.status(200).json({
            errCode: -1, 
            errMessage: 'Error from server'
        })
    }
    

} 

let saveInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctor(req.query.id);
        return res.status(200).json(info);

    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

}

let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome , 
    getAllDoctors: getAllDoctors,
    saveInfoDoctor : saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule
}