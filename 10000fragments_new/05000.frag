uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.98; vec2 jc = vec2(0.30 + 0.3 * sin(t * 0.80 + ph), 0.78 + 0.3 * cos(t * 1.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.27;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.53; kp = rot2(1.19) * kp; kp *= 1.40; }
    v = sin(kp.y * 1.73 - t * 1.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p = rot2(p.y * 2.43 + time * 0.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.83);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.03 + time * 0.19, vec3(0.59, 0.58, 0.53), vec3(0.49, 0.46, 0.35), vec3(1.00, 1.15, 0.73), vec3(0.54, 0.97, 0.33));
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
