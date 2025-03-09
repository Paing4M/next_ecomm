import Modal, {ModalProps} from "@/components/modal/Modal";
import ProductForm from "@/components/admin/product/ProductForm";
import {ProductSchemaI} from "@/lib/db/models/productModel";

interface ProductModalProps {
  open: boolean;
  closeModal: () => void;
  categories: CategoryHomeInterface[];
  editProduct: ProductSchemaI | null;
}

const ProductModal = ({open, closeModal, categories, editProduct}: ProductModalProps) => {

  return (
    <Modal open={open} closeModal={closeModal!}>
      <Modal.Title>
        {editProduct ? 'Edit Product' : 'Add Product'}
      </Modal.Title>
      <hr className='my-2'/>
      <div>
        <ProductForm editProduct={editProduct} categories={categories} closeModal={closeModal!}/>
      </div>
    </Modal>
  )
}

export default ProductModal
