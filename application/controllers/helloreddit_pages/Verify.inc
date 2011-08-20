<?php
require_once 'Home.inc';
require_once 'lib/Amazon.inc';

require_once 'models/Download.inc';
require_once 'models/File.inc';
require_once 'models/Product.inc';
require_once 'models/Transaction.inc';
require_once 'models/User.inc';

class HelloredditVerify extends HelloredditHome
{
    /**
     * @todo This contains a lot of Amazon and Transaction business logic. Move
     *       this logic into a controller.
     * @todo Add a check to ensure transaction exists on our end.
     */
    public function getContent() {
        
        // Create Amazon object
        $amazon = new Amazon();
        
        // Grab parameters
    	$expiry 		 = $_GET['expiry'];
        $tokenID         = $_GET['tokenID']; 
        $callerReference = $_GET['callerReference'];
        $certificateUrl  = $_GET['certificateUrl'];
        $signature       = $_GET['signature'];
        
        // Validate that the request came from amazon
        $valid = $amazon->validateRequest(
            $expiry,
            $tokenID,
            $callerReference,
            $certificateUrl,
            $signature
        );
        
        // If invalid, error.
        if (!$valid) {
            echo "An error has occured.  The transaction is not valid.";
            return;
        }
        
        // Get the transaction model for this transaction
        $transaction = TransactionModel::fetchByCallerReference($callerReference);
        
        // If payment has not yet been processed: 
        if (!$transaction->get('amazon_transaction_id')) {
            
            // Make payment request
            $result = $amazon->pay($tokenID, $callerReference);
                
            // Save transaction details
            $transaction->set('amazon_transaction_id', $result->transactionID);
            $transaction->set('amazon_request_id', $result->requestID);
            $transaction->save();
        }
        
        // Build download links
        $user = new UserModel($transaction->get('user_id'));
        
        include('helloreddit/xhtml/HelloRedditVerify.xhtml');
    }
}
?>