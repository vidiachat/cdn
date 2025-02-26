let start=0;const limit=10;let loading=!1,noMoreData=!1;const fetchVideos=async()=>{if(!loading&&!noMoreData){loading=!0,document.getElementById("loader").style.display="block";try{let e=await fetch(`api/video/video_home.php?start=${start}&limit=10`),t=await e.json();t.length>0?(renderVideos(t),start+=10):(noMoreData=!0,document.getElementById("loader").style.display="none",document.getElementById("no-more-data").style.display="block")}catch(d){console.error("Error fetching videos:",d)}finally{document.getElementById("loader").style.display="none",loading=!1}}},renderVideos=e=>{let t=document.getElementById("video-container");e.forEach(e=>{let d=document.createElement("div");d.className="video-item",d.innerHTML=`<div class="card" style="box-shadow:none;border-radius:0;border:none"><a href="watch.php?id=${e.id}"><div class="card-media h-52" style="border-radius:10px"><img src="${e.filePath}" alt="${e.title}"><div class="card-overly"></div></div></a><div class="card-body"><a href="watch.php?id=${e.id}" class="relative flex items-center gap-4 duration-200 rounded-xl"><div class="relative w-10 h-10 shrink-0"><img src="${e.filePath}" alt=" ${e.title}" class="object-cover w-full h-full rounded-full"></div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1.5"><div class="mr-auto text-sm text-black dark:text-white font-medium">${e.title}</div></div><div class="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">ashish</div><div class="card-list-info text-xs mt-1"><div>${e.views} views</div><div class="md:block hidden"></div><div>${e.uploadDate}</div></div></div></a></div></div>`,t.appendChild(d)})},handleScroll=()=>{!(window.innerHeight+window.scrollY>=document.body.offsetHeight-100)||loading||noMoreData||fetchVideos()};document.addEventListener("DOMContentLoaded",fetchVideos),window.addEventListener("scroll",handleScroll);
