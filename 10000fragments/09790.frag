uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.99; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 0.44 + ph), 0.77 + 0.3 * cos(t * 0.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 2.27 - time * 0.40); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.66 + time * 0.44); }
	p = rot2(1.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.22, vec3(0.48, 0.55, 0.55), vec3(0.38, 0.41, 0.45), vec3(0.99, 1.19, 1.34), vec3(0.05, 0.72, 0.04));
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
