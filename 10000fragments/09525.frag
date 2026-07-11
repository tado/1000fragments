uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.62; vec2 jc = vec2(0.09 + 0.3 * sin(t * 1.05 + ph), 0.62 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.04 + sin(p.y * 2.77 + t * 3.01) * 1.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	p = rot2(length(p) * -2.44 + time * 0.42) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.56 + time * -0.60); }
	p *= 2.64;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = d1 + d2;
	vec3 col = palette(d * 1.03 + time * 0.13, vec3(0.44, 0.42, 0.60), vec3(0.41, 0.42, 0.38), vec3(0.83, 1.15, 0.93), vec3(0.78, 0.07, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
