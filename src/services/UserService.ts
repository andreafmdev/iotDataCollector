import User, { UserCreationAttributes } from '@models/User';
import EmailAlreadyExistsError from '@errors/user/EmailAlreadyExistsError';
import UserError from '@errors/user/UserError';
import Role from '@models/Role';

interface CreateUserAttributes extends UserCreationAttributes {
    roleId: number;
}
class UserService {
    /**
     * Crea un nuovo utente nel database.
     * @param userDetails - Dettagli dell'utente da creare.
     * @returns L'utente creato.
     * @throws EmailAlreadyExistsError se l'email esiste già.
     */
    async createUser(userDetails: CreateUserAttributes): Promise<User> {
        try {
            //controllo di avere i permessi utente per farlo
            const role = await Role.findByPk(userDetails.roleId);
            if (!role) {
                throw new UserError('Role not found', 400);
            }


            // Check if the email already exists
            const existingUser = await this.findUserByEmail(userDetails.email);
            if (existingUser) {
                throw new EmailAlreadyExistsError();
            }

            return User.create(userDetails);

        } catch (error) {
            if (error instanceof UserError) {
                throw error; // Rilancia errori conosciuti
            } else {
                throw new UserError('Error creating user', 500); // Wrappa errori sconosciuti in un errore generico
            }
        }
    }
    /**
       * Elimina un utente nel database.
       * @param id - L'ID dell'utente da eliminare.
       * @returns void.
       */
    async deleteUser(id: number): Promise<void> {
        try {
            const user = await this.findUserById(id);
            if (!user) {
                throw new UserError('User not found', 404);
            }

            await user.destroy();
        } catch (error) {
            if (error instanceof UserError) {
                throw error;
            } else {
                throw new UserError('Error deleting user', 500);
            }
        }
    }
    /**
     * Trova un utente per email.
     * @param email - L'email dell'utente.
     * @returns L'utente trovato o null.
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email } });
    }
    /**
    * Trova un utente per ID.
    * @param id - L'ID dell'utente.
    * @returns L'utente trovato o null.
    */
    async findUserById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }
}

export default UserService;
