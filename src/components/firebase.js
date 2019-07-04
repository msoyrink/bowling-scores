import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyD2izFeC9AR7I0LCmVEBAqnrGfxaocDRck",
	authDomain: "mybowlingscores-300.firebaseapp.com",
	databaseURL: "https://mybowlingscores-300.firebaseio.com",
	projectId: "mybowlingscores-300",
	storageBucket: "mybowlingscores-300.appspot.com",
	messagingSenderId: "80315038059",
	appId: "1:80315038059:web:667854f7b995dca6"

}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}


	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	addScore(score) {
		if (!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return this.db.collection(`users-scores/${this.auth.currentUser.uid}/data`).add(
			score
		)
	}

	async getAllScores() {
		/* this.db.collection('users-scores').doc(this.auth.currentUser.uid).collection('data').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		}); */
		const scoresmap = await this.db.collection('users-scores').doc(this.auth.currentUser.uid).collection('data').get() // this.db.doc(param).get()
		return scoresmap.docs.map((doc) => {
			const id = doc.id
			return (
				{ ...doc.data(), id }
			)
		}

		)
	}
	async getScoreById(id) {
		/* this.db.collection('users-scores').doc(this.auth.currentUser.uid).collection('data').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		}); */
		const data = this.db.collection('users-scores').doc(this.auth.currentUser.uid).collection('data').doc(id).get().then(function (doc) {
			if (doc.exists) {
				return doc.data()
			} else {
				// doc.data() will be undefined in this case
				return null
			}
		}).catch(function (error) {
			console.log("Error getting document:", error)
			return null
		});
		return data

	}

}

export default new Firebase()