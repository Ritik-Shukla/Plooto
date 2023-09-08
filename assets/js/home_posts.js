{
    // Method to submit form data for new post using ajax 
let createPost = function () {
    let newPostform = $('#new-post-form');
    newPostform.on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostform.serialize(),
            success: function (data) {
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($('.delete-post-button',newPost));
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });
    }
    );
};

// Method to create a post in dome
let newPostDom = function(post){
return $(`<li id="post-${post._id}">
<p>
    
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
        </small>
        

            ${ post.content }
                <br>
                <small>
                    ${ post.user.name }
                </small>
</p>
<div class="post-comments">
    
        <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="Add Comment..." required>
            <input type="hidden" name="post" value="${ post._id }">
            <input type="submit" value="Add Comment">
        </form>
        
            <div class="post-comments-list">
                <ul id="post-comments-${post._id }">
                    
                </ul>
            </div>
</div>
</li>`)
}

// Method to delete a post from DOM 
let deletePost = function(deleteLink){
    $(deleteLink).on('click',function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
$(`#post-${data.data.post_id}`).remove();
            },error: function(error){
console.log(error.responseText);
            }
        })
    })
}

    createPost()
}