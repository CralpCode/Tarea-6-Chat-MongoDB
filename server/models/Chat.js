import { Schema,model } from "mongoose"

const schema = new Schema ({
    usuario : {
        type : String,
        required : true
    },
    mensaje : {
        type : String,
        required : true
    }
});

export default model('Chat', schema);