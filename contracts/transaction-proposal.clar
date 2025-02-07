;; Transaction Proposal Contract

(define-trait proposal-trait
  (
    (execute () (response bool uint))
  )
)

(define-map proposals
  { proposal-id: uint }
  {
    proposer: principal,
    recipient: principal,
    amount: uint,
    executed: bool
  }
)

(define-data-var proposal-nonce uint u0)

(define-constant ERR_ALREADY_EXECUTED (err u400))
(define-constant ERR_UNAUTHORIZED (err u401))
(define-constant ERR_NOT_FOUND (err u404))

(define-public (create-proposal (recipient principal) (amount uint))
  (let
    ((new-proposal-id (+ (var-get proposal-nonce) u1)))
    (map-set proposals
      { proposal-id: new-proposal-id }
      {
        proposer: tx-sender,
        recipient: recipient,
        amount: amount,
        executed: false
      }
    )
    (var-set proposal-nonce new-proposal-id)
    (ok new-proposal-id)
  )
)

(define-public (execute (proposal-id uint))
  (let
    ((proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) ERR_NOT_FOUND)))
    (asserts! (not (get executed proposal)) ERR_ALREADY_EXECUTED)
    (try! (as-contract (stx-transfer? (get amount proposal) tx-sender (get recipient proposal))))
    (map-set proposals
      { proposal-id: proposal-id }
      (merge proposal { executed: true })
    )
    (ok true)
  )
)

(define-read-only (get-proposal (proposal-id uint))
  (map-get? proposals { proposal-id: proposal-id })
)

