;; Signature Verification Contract

(define-map signatures
  { signer: principal }
  { is-valid: bool }
)

(define-constant ERR_INVALID_SIGNATURE (err u403))

(define-public (add-signature)
  (begin
    (map-set signatures
      { signer: tx-sender }
      { is-valid: true }
    )
    (ok true)
  )
)

(define-public (verify-signatures (signers (list 10 principal)))
  (let
    ((valid-count (fold check-signatures signers u0)))
    (asserts! (> valid-count u0) ERR_INVALID_SIGNATURE)
    (ok valid-count)
  )
)

(define-private (check-signatures (signer principal) (valid-count uint))
  (if (default-to false (get is-valid (map-get? signatures { signer: signer })))
    (+ valid-count u1)
    valid-count
  )
)

(define-read-only (is-valid-signature (signer principal))
  (default-to false (get is-valid (map-get? signatures { signer: signer })))
)

