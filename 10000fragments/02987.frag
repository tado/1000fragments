uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.03; vec2 jc = vec2(0.10 + 0.3 * sin(t * 0.32 + ph), -0.49 + 0.3 * cos(t * 0.32 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.51 + t * 1.42 + ph) + sin(p.y * 6.11 - t * 4.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 2.21 + time * 0.13); }
	p = rot2(2.26) * p;
	p = fract(p * 1.39) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = d1 * d2;
	vec3 col = palette(d * 1.45 + time * 0.17, vec3(0.59, 0.41, 0.59), vec3(0.40, 0.31, 0.49), vec3(0.90, 0.79, 1.09), vec3(0.88, 0.17, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
