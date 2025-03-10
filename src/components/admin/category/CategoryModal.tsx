import Modal from "@/components/modal/Modal";
import CategoryForm from "@/components/admin/category/CategoryForm";

interface CategoryModalProps {
  closeModal: () => void
  open: boolean
  category: CategoryI | null
}

const CategoryModal = ({closeModal, open, category}: CategoryModalProps) => {
  return (
    <Modal open={open} closeModal={closeModal}>
      <Modal.Title>

        {category ? 'Edit' : 'Add Category'}
      </Modal.Title>
      <hr className='my-2'/>
      <div>
        <CategoryForm category={category} closeModal={closeModal}/>
      </div>
    </Modal>
  )
}

export default CategoryModal
