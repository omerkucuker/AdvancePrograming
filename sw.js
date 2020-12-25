const CACHE = 'AdvancePrograming';
const FILES = ['AdvancePrograming/images/icon192', 'AdvancePrograming/TermProject/KelimeTahmin.html', 'AdvancePrograming/CW%232/Counting.html','AdvancePrograming/CW%232/length.html','AdvancePrograming/CW%233/chap4.html','AdvancePrograming/CW%234/List_of_Objects.html','AdvancePrograming/CW%235/chap4.html','AdvancePrograming/CW%236/Callback_and_Promise.html','AdvancePrograming/CW%237/StudentsData.html','AdvancePrograming/CW%238/FilesSelect.html','AdvancePrograming/CW%239/cw9_Page_by_JS.html','AdvancePrograming/CW%2310/Crypto_cw10.html','AdvancePrograming/CW%2311/Event_listeners.html','AdvancePrograming/CW%2312/GitHubApi.html','AdvancePrograming/CW%2313/WeatherApi.html','AdvancePrograming/CW%2314/Open_Maps_with_WeatherApi.html','AdvancePrograming/CW%2315/DriveAPI.html','AdvancePrograming/HW1/Poisson_table.html','AdvancePrograming/HW2/StudentsDB.html','305/anim/Animation.html']
function installCB(e) {
  console.log(CACHE, e);
   e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
addEventListener('install', installCB)

function save(req, resp) {
  if (!req.url.includes("github")) 
     return resp;
  return caches.open(CACHE)
  .then(cache => { // save request
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.err)
}
function report(req) {
  console.log(CACHE+' matches '+req.url)
  return req
}
function fetchCB(e) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => caches.match(req).then(report))
  )
}
addEventListener('fetch', fetchCB)

function activateCB(e) {
  console.log(CACHE, e);
}
addEventListener('activate', activateCB);