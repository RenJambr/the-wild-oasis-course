import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  //   const [showForm, setShowForm] = useState(false);

  //   return (
  //     <>
  //       <Button onClick={() => setShowForm((show) => !show)}>
  //         Add new cabin
  //       </Button>
  //       {showForm && (
  //         <Modal onClose={() => setShowForm(false)}>
  //           <CreateCabinForm onCloseModal={() => setShowForm(false)} />
  //         </Modal>
  //       )}
  //     </>
  //   );
}

export default AddCabin;
