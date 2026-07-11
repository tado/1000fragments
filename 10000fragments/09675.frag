uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 37.98 - t * 2.12 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 13.44 - t * 2.12 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(0.10 + 0.3 * sin(t * 0.66 + ph), -0.11 + 0.3 * cos(t * 0.66 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.08, lr * 2.27 + time * -0.69); }
	p = rot2(2.53) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.56 + time * 0.13, vec3(0.48, 0.51, 0.41), vec3(0.44, 0.45, 0.45), vec3(1.16, 1.24, 1.03), vec3(0.99, 0.45, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
