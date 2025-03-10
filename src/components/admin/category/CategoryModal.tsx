import Modal from "@/components/modal/Modal";
import CategoryForm from "@/components/admin/category/CategoryForm";

interface CategoryModalProps {
  closeModal: () => void;
  open: boolean
}

const CategoryModal = ({closeModal, open}: CategoryModalProps) => {
  return (
    <Modal open={open} closeModal={closeModal}>
      <Modal.Title>
        {/*{editProduct ? 'Edit Product' : 'Add Product'}*/}
        Add Category
      </Modal.Title>
      <hr className='my-2'/>
      <div>
        <CategoryForm closeModal={closeModal}/>
      </div>
    </Modal>
  )
}

export default CategoryModal
