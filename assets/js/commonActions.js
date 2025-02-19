const postVideo = document.querySelectorAll(".post-video"),
   videoPlayer = document.querySelectorAll(".video-player"),
   post = document.querySelectorAll(".post");
let isPlaying = !0;

function playVideo(s) {
   postVideo[s].play(), isPlaying = !0
}

function pauseVideo(s) {
   postVideo[s].pause(), isPlaying = !1
}
postVideo.forEach((s, e) => {
   s.loop = !0, s.autoBuffer = !0, videoPlayer[e].addEventListener("click", function () {
      isPlaying ? pauseVideo(e) : playVideo(e)
   })
});
const postComments = document.querySelectorAll(".post-comments"),
   commentBtn = document.querySelectorAll(".comment-btn"),
   commentClose = document.querySelectorAll(".close-comment");

function postComment(s, e, t, i, a) {
   var n = $(s).siblings("textarea"),
      o = n.val();
   n.val(""), o ? $.post("ajax/postComment.php", {
      commentText: o,
      postedBy: e,
      videoId: t,
      responseTo: i
   }).done(function (e) {
      i ? $(s).parent().siblings("." + a).append(e) : $("." + a).prepend(e)
   }) : alert("You can't post an empty comment")
}

function toggleReply(s) {
   $(s).closest(".itemContainer").find(".commentForm").first().toggleClass("hidden-comment")
}
function likeComment(s, e, t) {
   $.post("ajax/likeComment.php", {
      commentId: s,
      videoId: t
   }).done(function (s) {
      var t = $(e),
         i = $(e).siblings(".dislikeButton");
      t.addClass("active"), i.removeClass("active"), updateLikesValue($(e).siblings(".likesCount"), s), s < 0 ? (t.removeClass("active"), t.find("img:first").attr("src", "assets/svg/like.svg")) : t.find("img:first").attr("src", "assets/svg/likeactive.svg"), i.find("img:first").attr("src", "assets/svg/like.svg")
   })
}


function dislikeComment(s, e, t) {
   $.post("ajax/dislikeComment.php", {
      commentId: s,
      videoId: t
   }).done(function (s) {
      var t = $(e),
         i = $(e).siblings(".likeButton");
      t.addClass("active"), i.removeClass("active"), updateLikesValue($(e).siblings(".likesCount"), s), s > 0 ? (t.removeClass("active"), t.find("img:first").attr("src", "assets/images/icons/thumb-down.png")) : t.find("img:first").attr("src", "assets/images/icons/thumb-down-active.png"), i.find("img:first").attr("src", "assets/images/icons/thumb-up.png")
   })
}

function updateLikesValue(s, e) {
   var t = s.text() || 0;
   s.text(parseInt(t) + parseInt(e))
}

function getReplies(s, e, t) {
   $.post("ajax/getCommentReplies.php", {
      commentId: s,
      videoId: t
   }).done(function (s) {
      var t = $('<div style="padding-left: 2.5rem; ">').addClass("repliesSection");
      t.append(s), $(e).replaceWith(t)
   })
}

function notSignedIn() {
   location.replace("signIn")
}

function setNewThumbnail(s, e, t) {
   $.post("ajax/updateThumbnail.php", {
      videoId: e,
      thumbnailId: s
   }).done(function () {
      var s = $(t);
      $("." + s.attr("class")).removeClass("selected"), s.addClass("selected"), alert("Thumbnail updated")
   })
}

function myFunctioncomments() {
   var s = document.getElementById("dots"),
      e = document.getElementById("more");
   "none" === s.style.display ? (s.style.display = "inline", e.style.display = "none") : (s.style.display = "none", e.style.display = "inline")
}

function myFunction() {
   document.getElementById("myPopup").classList.toggle("show")
}

function saveVideo(s, e) {
   $.post("ajax/saveVideo.php", {
      videoId: e
   }).done(function (e) {
      var t = $(s),
         i = $(s).siblings(".unsaveButton");
      t.addClass("actives"), i.removeClass("actives");
      var a = JSON.parse(e);
      updatesavesValue(t.find(".videotext"), a.saves), updatesavesValue(i.find(".videotext"), a.unsaves), a.saves < 0 ? (t.removeClass("actives"), t.find("img:first").attr("src", "assets/svg/save.svg")) : t.find("img:first").attr("src", "assets/svg/savefully.svg"), i.find("img:first").attr("src", "assets/svg/save.svg")
   })
}

function unsaveVideo(s, e) {
   $.post("ajax/unsaveVideo.php", {
      videoId: e
   }).done(function (e) {
      var t = $(s),
         i = $(s).siblings(".saveButton");
      t.addClass("actives"), i.removeClass("actives");
      var a = JSON.parse(e);
      updatesavesValue(i.find(".videotext"), a.saves), updatesavesValue(t.find(".videotext"), a.unsaves), a.unsaves < 0 ? (t.removeClass("actives"), t.find("img:first").attr("src", "assets/images/icons/thumb-down.png")) : t.find("img:first").attr("src", "assets/images/icons/thumb-down-actives.png"), i.find("img:first").attr("src", "assets/images/icons/thumb-up.png")
   })
}

function updatesavesValue(s, e) {
   var t = s.text() || 0;
   s.text(parseInt(t) + parseInt(e))
}

function subscribe(s, e, t) {
   if (s == e) {
      alert("You can't subscribe to yourself");
      return
   }
   $.post("ajax/subscribe.php", {
      userTo: s,
      userFrom: e
   }).done(function (s) {
      if (null != s) {
         $(t).toggleClass("subscribe unsubscribe");
         var e = $(t).hasClass("subscribe") ? "Follow" : "Following";
         $(t).text(e + " " + s)
      } else alert("Something went wrong")
   })
}

function likeVideo(s, e) {
   $.post("ajax/likeVideo.php", {
      videoId: e
   }).done(function (e) {
      var t = $(s),
         i = $(s).siblings(".dislikeButton");
      t.addClass("active"), i.removeClass("active");
      var a = JSON.parse(e);
      updateLikesValue(t.find(".videotext"), a.likes), updateLikesValue(i.find(".videotext"), a.dislikes), a.likes < 0 ? (t.removeClass("active"), t.find("img:first").attr("src", "assets/svg/like.svg")) : t.find("img:first").attr("src", "assets/svg/likeactive.svg"), i.find("img:first").attr("src", "assets/svg/like.svg")
   })
}

function dislikeVideo(s, e) {
   $.post("ajax/dislikeVideo.php", {
      videoId: e
   }).done(function (e) {
      var t = $(s),
         i = $(s).siblings(".likeButton");
      t.addClass("active"), i.removeClass("active");
      var a = JSON.parse(e);
      updateLikesValue(i.find(".videotext"), a.likes), updateLikesValue(t.find(".videotext"), a.dislikes), a.dislikes < 0 ? (t.removeClass("active"), t.find("img:first").attr("src", "assets/images/icons/thumb-down.png")) : t.find("img:first").attr("src", "assets/images/icons/thumb-down-active.png"), i.find("img:first").attr("src", "assets/images/icons/thumb-up.png")
   })
}

function updateLikesValue(s, e) {
   var t = s.text() || 0;
   s.text(parseInt(t) + parseInt(e))
}
postComments.forEach((s, e) => {
   commentBtn[e].addEventListener("click", function () {
      postComments[e].classList.add("open")
   }), commentClose[e].addEventListener("click", function () {
      postComments[e].classList.remove("open")
   })
}), $(document).ready(function () {
   var s = "....";
   $(".moredata").each(function () {
      var e = $(this).html();
      if (e.length > 35) {
         var t = e.substr(0, 35),
            i = e.substr(35, e.length - 35);
         $(this).html(t + '<span class="moreellipses"> </span><span class="morecontent" style="display: contents;"><span>' + i + '</span> <a href="" class="morelink">' + s + "</a></span>")
      }
   }), $(".morelink").click(function () {
      return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html(s)) : ($(this).addClass("less"), $(this).html("....")), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1
   })
}), $(document).ready(function () {
   $(".menusidebar").on("click", function () {
      var s = $("#pageContainer"),
         e = $("#sideNavContainer");
      s.hasClass("leftPadding") ? e.hide() : e.show(), s.toggleClass("leftPadding")
   })
});