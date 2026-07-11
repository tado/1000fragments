uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.18; vec2 jc = vec2(0.24 + 0.3 * sin(t * 1.04 + ph), -0.17 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.15, lr * 2.06 + time * 0.58); }
	p = rot2(1.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.04, vec3(0.43, 0.54, 0.49), vec3(0.46, 0.49, 0.30), vec3(0.90, 0.70, 0.85), vec3(0.26, 0.02, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
