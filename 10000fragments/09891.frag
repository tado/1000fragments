uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.09; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 0.86 + ph), -0.41 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.11 - t * 8.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.01, lr * 1.47 + time * 0.28); }
	p = rot2(time * 0.93) * p;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.37 + time * 0.23, vec3(0.47, 0.53, 0.49), vec3(0.42, 0.32, 0.31), vec3(1.03, 1.09, 0.76), vec3(0.84, 0.51, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
