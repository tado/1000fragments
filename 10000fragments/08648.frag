uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.84; vec2 jc = vec2(-0.75 + 0.3 * sin(t * 1.24 + ph), -0.17 + 0.3 * cos(t * 1.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.62, t * 0.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = rot2(3.09) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.13, lr * 2.23 + time * 0.49); }
	p = rot2(p.y * -1.14 + time * 0.29) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = d1 + d2;
	vec3 col = palette(d * 0.70 + time * 0.17, vec3(0.43, 0.52, 0.59), vec3(0.47, 0.45, 0.35), vec3(0.84, 1.31, 0.76), vec3(0.98, 1.00, 0.40));
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
