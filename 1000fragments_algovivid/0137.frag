uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.22; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.44 + ph), -0.61 + 0.3 * cos(t * 0.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	float d = field(p, (time * 0.83), 0.0);
	vec3 col = palette(d * 1.28 + (time * 0.83) * 0.21, vec3(0.49, 0.46, 0.45), vec3(0.19, 0.16, 0.21), vec3(0.89, 0.62, 0.74), vec3(0.92, 0.14, 0.41));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 1.024, 0.956) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
