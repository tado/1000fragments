uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(-0.28 + 0.3 * sin(t * 0.26 + ph), -0.63 + 0.3 * cos(t * 0.26 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.81 + t * 4.66 + ph) + sin(p.y * 9.84 - t * 1.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = d1 * d2;
	vec3 col = palette(d * 0.84 + time * 0.10, vec3(0.47, 0.51, 0.41), vec3(0.38, 0.47, 0.30), vec3(0.77, 1.08, 0.97), vec3(0.89, 0.94, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
