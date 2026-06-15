uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.57; vec2 jc = vec2(-0.28 + 0.3 * sin(t * 0.43 + ph), -0.62 + 0.3 * cos(t * 0.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.01 + sr * 16.28 - t * 4.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.64 + time * 0.14) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 2.16 + time * 0.36); }
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 2.82 - time * 0.17); }
	p = fract(p * 1.02) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = d1 + d2;
	vec3 col = palette(d * 0.77 + time * 0.29, vec3(0.57, 0.55, 0.50), vec3(0.31, 0.44, 0.50), vec3(1.25, 0.72, 1.36), vec3(0.63, 0.77, 0.74));
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
