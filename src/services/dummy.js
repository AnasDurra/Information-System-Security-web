@SubscribeMessage('addMarks')
  async create(client: Socket, payload: any) {
    try {
      const authorization = payload.token;

      if (!authorization) {
        client.emit('addMarksResult', 'Authorization token is required');
        client.disconnect(true);
        return;
      }

      const user = await this.userService.userTokenExchange({
        access_token: authorization,
      });

      if (!user) {
        client.emit('addMarksResult', {
          status: 401,
          error: 'Access Token is Invalid',
        });
        client.disconnect(true);
        return;
      } else if (user && user.user_role_id != 1) {
        client.emit('addMarksResult', {
          status: 401,
          error: 'User Unauthorized',
        });
        client.disconnect(true);
        return;
      }

      const session_key = user.session_key;
     
      const decryptedData = symDecrypt(payload.data, session_key, payload.iv);
      const jsonString = atob(decryptedData);
      const data: CreateMarkDto[] = JSON.parse(jsonString);

      if (
        !this.verifyMessage(
          payload.data,
          payload.signature,
          forge.pki.publicKeyFromPem(payload.pub_key),
        )
      ) {
        client.emit('addMarksResult', {
          status: 401,
          error: 'Invalid Request',
        });
        client.disconnect(true);
        return;
      }

      await this.marksService.add(data, user);

      client.emit('addMarksResult', {
        status: 201,
        error: 'Request Completed',
      });

    } catch (error) {
      if (error instanceof UnauthorizedException) {
        client.emit('addMarksResult', {
          status: 500,
          error: 'User Unauthorized',
        });
      } else if (error instanceof ConflictException) {
        client.emit('addMarksResult', {
          status: 500,
          error: 'Please Validate Your Data',
        });
      } else {
        client.emit('addMarksResult', {
          status: 500,
          error: 'Invalid request',
        });
      }
    }
  }