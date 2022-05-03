import { useState, useEffect } from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const Employees = () => {
	const [formData, setFormData] = useState({});
	const [photoWidth, setPhotoWidth] = useState(100);
	const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
		defaultValues: {
			department: 'Sales'
		}
	});
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:5000/employees');
			const employees = await response.json();
			setEmployees(employees);
		})();
	}, []);

	useEffect(() => {
		const firstName = watch('firstName');
		if (firstName.startsWith('/') && firstName.endsWith('/')) {
			const rest = firstName.replaceAll('/', '');
			const id = Number(rest);
			if (!isNaN(id) && id !== 0) {
				const employee = employees.find(m => m.id === id);
				if (employee !== undefined) {
					setValue('firstName', employee.firstName);
					setValue('lastName', employee.lastName);
				}
			}
		}
	}, [watch('firstName')]);

	const handleSliderChange = (e) => {
		setPhotoWidth(e.target.value)
	}
	const handleCarouselChange = (data) => {
		console.log(data);
	}
	const showCarouselText = () => {
		return photoWidth > 350;
	}
	return (
		<>
			<div className="app-slider-area">
				<input type="range" min="100" max="400" onChange={handleSliderChange} value={photoWidth} />
			</div>

			<Carousel style={{ 'width': `${photoWidth}px` }} onSelect={handleCarouselChange} controls={showCarouselText()} indicators={showCarouselText()}>
				{employees.map((employee, index) => {
					return (
						<Carousel.Item key={index}>
							<img

								className="d-block w-100"
								src={`images/employees/employee_${employee.id}.jpg`}
							/>
							{showCarouselText() && (
								<Carousel.Caption>
									<h3>{employee.firstName} {employee.lastName} ({employee.id})</h3>
								</Carousel.Caption>
							)}
						</Carousel.Item>
					)
				})}
			</Carousel>

			<Form className="mt-4" onSubmit={handleSubmit((data) => {
				setFormData(data);
			})}>
				<Form.Group className="mb-3 app-form-group">
					<Form.Label>First Name</Form.Label>
					<input className="app-input" type="text" {...register("firstName", { required: 'First name is required.', minLength: { value: 2, message: 'First name must be at least 2 characters.' } })} />
					<Form.Text className="text-muted app-text-danger">
						<div>{errors.firstName?.message}</div>
					</Form.Text>
					<Form.Text className="text-muted">
						You can type in an id (<code>/id/</code>) for auto-complete, e.g. <code>/5/</code>.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3 app-form-group">
					<Form.Label>Last Name</Form.Label>
					<input className="app-input" type="text" {...register("lastName", { required: 'Last name is required.', minLength: { value: 2, message: 'Last name must be at least 2 characters.' } })} />
					<Form.Text className="text-muted app-text-danger">
						<div>{errors.lastName?.message}</div>
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3 app-form-group">
					<Form.Label>Department</Form.Label>
					<input className="app-input" type="text" {...register("department", { required: 'Department is required.' })} />
					<Form.Text className="text-muted app-text-danger">
						<div>{errors.department?.message}</div>
					</Form.Text>
				</Form.Group>

				<Button disabled={Object.keys(errors).length} variant="primary" type="submit">
					Submit
				</Button>
				{Object.keys(formData).length > 0 && (
					<div className="formData"><pre>{JSON.stringify(formData, null, 2)}</pre></div>
				)}
			</Form>
		</>
	)
}