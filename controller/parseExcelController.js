const xlsParse = require('xlsx');
const petModel = require('../models/schemaforpet')

let test = async function (req, res) {
    return res.send("succesfullly connected")
}

let getdataFromExcel = async function (req, res) {

    try {
        let excelFile = req.file
        console.log(excelFile)
        const file = xlsParse.readFile('./test2.xlsx')
        let sheet = file.SheetNames
        let data = []

        for (let i = 0; i < sheet.length; i++) {
            const temp = xlsParse.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((element) => {
                data.push(element)

            });
        }
        let saveDb = await petModel.create(...data)
        return res.status(200).send({ status: true, msg: "Successfully save data excel to MongoDB Database", responce: saveDb })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const getAllPet = async function (req, res) {
    try {
        let getAllPet = await petModel.find()
        if (!getAllPet) {
            return res.status(404).send({ msg: 'No pet Found' })
        }
        return res.status(200).send({ status: true, petList: getAllPet })
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const getPetById = async function (req, res) {
    try {
        let data = req.params.petId
        let getPetById = await petModel.findById(data)
        if (!getPetById) {
            return res.status(404).send({ msg: 'No pet Found' })
        }
        return res.status(200).send({ status: true, petList: getPetById })
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const editSpecificPet = async function (req, res) {
    try {
        let petId = req.params.petId
        let data = req.body
        let { Name, Type, Breed, Age } = data
        let update = {}
        update["Name"] = Name
        update["Type"] = Type
        update["Breed"] = Breed
        update["Age"] = Age


        const updateData = await petModel.findOneAndUpdate(
            { _id: petId },
            {
                $set: update,
            },
            { new: true }
        );
        return res.status(200).send({ status: true, msg: 'Updated Successfully', updated: updateData })
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}



const getPetByIdAndDelete = async function (req, res) {
    try {
        let data = req.params.petId

        let getPetById = await petModel.findByIdAndDelete(data)
        if (!getPetById) {
            return res.status(404).send({ msg: 'No pet Found' })
        }
        return res.status(200).send({ status: true, msg: "SuccesFully Deleted Pet" })
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}






module.exports.test = test
module.exports.getdataFromExcel = getdataFromExcel
module.exports.getAllPet = getAllPet
module.exports.getPetById = getPetById
module.exports.editSpecificPet = editSpecificPet
module.exports.getPetByIdAndDelete = getPetByIdAndDelete