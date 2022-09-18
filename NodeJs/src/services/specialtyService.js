import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

let createNewSpecailty = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create Specialty successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    createNewSpecailty
}