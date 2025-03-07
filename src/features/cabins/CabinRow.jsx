import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    discount,
    regularPrice,
    description,
  } = cabin;

  function handleDuplicateCabin(cabin) {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      discount,
      regularPrice,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={`${image}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        {/* <Button>Delete</Button> */}
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Modal>
            <Menus.List id={cabinId}>
              <Menus.Button
                disabled={isCreating}
                onClick={() => handleDuplicateCabin(cabin)}
              >
                <HiSquare2Stack />
                <span>Duplicate</span>
              </Menus.Button>
              <Modal.Open opens="cabins">
                <Menus.Button>
                  <HiPencil />
                  <span>Edit</span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Open>
                <Menus.Button>
                  <HiTrash />
                  <span>Delete</span>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="cabins">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window>
              <ConfirmDelete
                resourceName={"cabin"}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
      </Table.Row>
    </>
  );
}

export default CabinRow;
