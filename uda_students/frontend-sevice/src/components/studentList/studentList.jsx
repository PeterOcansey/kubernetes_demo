import React from "react";
import styled from "styled-components";
import ListItem from "../listItem/listItem";

const StudentList = ({ students }) => {
	return (
		<Wrapper className='container' data-testid='test_productsList'>
			{students.length > 0 ? (
				students
					.map((item) => (
						<ListItem
							key={item._id}
							name={item.name}
							course={item.course}
							country={item.country}
						/>
					))
					.reverse()
			) : (
				<p>There are no students available</p>
			)}
		</Wrapper>
	);
};

export default StudentList;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 120px;
`;
