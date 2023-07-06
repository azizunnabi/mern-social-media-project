const {body} = require("express-validator");
module.exports.registerValidations =[
body("name").not().isEmpty().trim().withMessage("name is required"),
body("userName").not().isEmpty().trim().withMessage("User name is required"),
body("password").not().isEmpty().isLength({min: 6, max:50}).withMessage("correct Password is required")
];

module.exports.loginValidations =[
    body("userName").not().isEmpty().trim().withMessage("User name is required"),
    body("password").not().isEmpty().isLength({min: 6, max:50}).withMessage("Password is required")
    ];

    module.exports.postValidations = [
        body("postTitle").not().isEmpty().trim().withMessage("psot title is required"),
        body("postDescription").not().isEmpty().withMessage("post description is required"),
        body("user").not().isEmpty().withMessage("user is required"),
      ];
    module.exports.updatePostValidations = [
        body("postTitle").not().isEmpty().trim().withMessage("title is required"),
        body("postDescription").not().isEmpty().withMessage("description is required"),
        body("postId").not().isEmpty().withMessage("post id is required"),
]; 