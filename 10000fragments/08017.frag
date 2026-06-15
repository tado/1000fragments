uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.68; vec2 jc = vec2(-0.68 + 0.3 * sin(t * 0.36 + ph), 0.01 + 0.3 * cos(t * 0.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 1.12 + time * 0.54); }
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	p = rot2(length(p) * 3.84 + time * 0.40) * p;
	p *= 2.92;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.13, vec3(0.54, 0.43, 0.58), vec3(0.38, 0.37, 0.33), vec3(0.95, 1.20, 1.28), vec3(0.52, 0.69, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
