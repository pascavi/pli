<?php

namespace Drupal\metatag\Generator;

use Drupal\Console\Generator\Generator;

class MetatagTagGenerator extends Generator {

  /**
   * Generator plugin.
   *
   * @param string $base_class
   * @param string $module
   * @param string $name
   * @param string $label
   * @param string $description
   * @param string $plugin_id
   * @param string $class_name
   * @param string $group
   * @param string $weight
   * @param string type
   * @param bool $secure
   * @param bool $multiple
   */
  public function generate($base_class, $module, $name, $label, $description, $plugin_id, $class_name, $group, $weight, $type, $secure, $multiple) {
    $parameters = [
      'base_class' => $base_class,
      'module' => $module,
      'name' => $name,
      'label' => $label,
      'description' => $description,
      'plugin_id' => $plugin_id,
      'class_name' => $class_name,
      'group' => $group,
      'weight' => $weight,
      'type' => $type,
      'secure' => $secure,
      'multiple' => $multiple,
      'prefix' => '<' . '?php',
    ];

    $this->renderFile(
      'tag.php.twig',
      $this->getSite()->getPluginPath($module, 'metatag/Tag') . '/' . $class_name . '.php',
      $parameters
    );

    $this->renderFile(
      'metatag_tag.schema.yml.twig',
      $this->getSite()->getModulePath($module) . '/config/schema/' . $module . '.metatag_tag.schema.yml',
      $parameters,
      FILE_APPEND
    );
  }

}
