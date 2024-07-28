import UpdateUserForm from "@/components/forms/UpdateProfile";
import AvatarUploader from "@/components/user/UpdateProfileImage";

export default function UpdateUserPage() {
  return (
    <main className="p-4">
      <UpdateUserForm />
      <AvatarUploader />
    </main>
  );
}
