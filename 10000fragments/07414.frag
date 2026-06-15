uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.17 + t * 2.81 + ph) + sin(p.y * 5.18 - t * 3.98 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.09; vec2 jc = vec2(-0.37 + 0.3 * sin(t * 0.47 + ph), 0.30 + 0.3 * cos(t * 0.47 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 5.64 - time * 0.65); }
	p = rot2(p.y * -3.35 + time * 0.63) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 2.95 + time * -0.35); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.05, vec3(0.54, 0.48, 0.41), vec3(0.43, 0.35, 0.38), vec3(1.29, 0.81, 1.02), vec3(0.42, 0.96, 0.65));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
