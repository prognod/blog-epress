const commentModel = require('@models/comment');
const userService = require('@services/userService');
const dateService = require('@services/dateService');
const commentStatus = require('@models/comment/commentStatus');

exports.index = async (req, res) => {
    const comments = await commentModel.findAll();
    const presentedComments = comments.map(comment => {
        comment.userAvatar = userService.gravatar(comment.user_email);
        comment.jalali_created_at = dateService.toPersianDate(comment.created_at);
        return comment;
    })
    res.adminRender('admin/comments/index', {comments:presentedComments, helpers:{
        commentBackground: function(status, options){
            let cssClass = 'alert ';
            switch (true) {
                case status === commentStatus.APPROVED:
                    cssClass+='alert-success';                    
                    break;
                case status === commentStatus.REJECTED:
                    cssClass+='alert-danger';                    
                    break;
                case status === commentStatus.REVIEW:
                    cssClass+='alert-dark';                    
                    break;
            }
            return cssClass;
        }
    }});
}

exports.approve = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.approve(commentID);
    return res.redirect('/admin/comments');
}

exports.reject = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.reject(commentID);
    return res.redirect('/admin/comments');
}

exports.delete = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.delete(commentID);
    return res.redirect('/admin/comments');
}