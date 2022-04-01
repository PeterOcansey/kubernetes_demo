import React from "react";
import styled from "styled-components";
import CustomInput from "../custonInput/CustomInput";
import Button from "../button/button";
import { ClipLoader } from "react-spinners";

const AddEditItem = ({
	action,
	data,
	onChangeName,
	onChangeCourse,
	onChangeCountry,
	isAdding,
	isEditing,
	onActionClicked,
}) => {
	return (
		<Wrapper>
			<CustomInput label='Name' value={data.name} onChange={onChangeName} />
			<CustomInput label='Course' value={data.course} onChange={onChangeCourse} />
			<CustomInput label='Country' value={data.country} onChange={onChangeCountry} />
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={onActionClicked}>
					{isAdding || isEditing ? (
						<ClipLoader
							color='#2db3e4'
							loading={isAdding}
							size={30}
							css={{ alignSelf: "center" }}
						/>
					) : action === "add-student" ? (
						"add"
					) : (
						"edit"
					)}
				</Button>
			</div>
		</Wrapper>
	);
};

export default AddEditItem;

const Wrapper = styled.div`
	margin-bottom: 20px;
`;
