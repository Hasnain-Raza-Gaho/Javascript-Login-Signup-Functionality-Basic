// console.log(firebase)

function signup() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((val)=>{
        var snap = val.user;
        console.log(snap.email)
        // console.log(val)


        var obj = {
            name : 'hasnain',
            class : 13,
            email : snap.email,
            uid : snap.uid,
            password : password

        }

        firebase.database().ref('/User').child(snap.uid).set(obj)
        window.location = 'login.html'
    })




    .catch((err)=>{
        console.log(err)
    })
}





function signin(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((smit)=>{
        console.log(smit)
        localStorage.setItem('User_Uid',smit.user.uid)
        window.location = 'home.html'
    })
    .catch((err)=>{
        console.log(err.message)
    })
}




function home(){
    var uid = localStorage.getItem('User_Uid')
    var name = document.getElementById('name');
    var email = document.getElementById('email')

    firebase.database().ref('/User/').child(uid).once('value',function(smit){
console.log(smit.val())
console.log(uid.strike)

name.innerText = smit.val().name
email.innerText = smit.val().email

    })
}