import Modal, {ModalProps} from "@/components/modal/Modal";
import AddProductForm from "@/components/admin/product/AddProductForm";

interface ProductModalProps {
  open: boolean;
  closeModal: () => void;
  categories: CategoryHomeInterface[];
}

const ProductModal = ({open, closeModal, categories}: ProductModalProps) => {

  return (
    <Modal open={open} closeModal={closeModal!}>
      <Modal.Title>
        Add Product
      </Modal.Title>
      <hr className='my-2'/>
      <div>
        <AddProductForm categories={categories} closeModal={closeModal!}/>
      </div>
    </Modal>
  )
}

export default ProductModal
