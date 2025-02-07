;; Access Control Contract

(define-map authorized-signers principal bool)

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u401))

(define-public (add-signer (signer principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (map-set authorized-signers signer true)
    (ok true)
  )
)

(define-public (remove-signer (signer principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (map-delete authorized-signers signer)
    (ok true)
  )
)

(define-read-only (is-authorized-signer (signer principal))
  (default-to false (map-get? authorized-signers signer))
)

