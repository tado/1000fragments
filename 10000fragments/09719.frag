uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(-0.02 + 0.3 * sin(t * 1.03 + ph), -0.58 + 0.3 * cos(t * 1.03 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = abs(p);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.35; p = rot2(2.01) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 2.67 + time * 0.17); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.13, vec3(0.41, 0.44, 0.58), vec3(0.32, 0.44, 0.44), vec3(1.15, 1.27, 0.99), vec3(0.98, 0.50, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
