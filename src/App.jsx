// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap.superhero.min.css';
// import './styles/bootstrap.sketchy.min.css';
import './styles/App.css'
import { Container, Button } from 'react-bootstrap';
import { Employees } from './components/Employees';

function App() {
	return (
		<div className="App">
			<Container>
				<h1>Employee Site</h1>
				<Employees />
			</Container>
		</div>
	)
}

export default App
