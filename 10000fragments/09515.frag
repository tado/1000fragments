uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(0.33 + 0.3 * sin(t * 0.36 + ph), -0.77 + 0.3 * cos(t * 0.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.18 * cos(sa * 6 + t * 0.59 + ph);
    v = sin((sr - petal) * 8.01);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	p = rot2(2.37) * p;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 3.96 - time * 0.20); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.38, lr * 2.74 + time * -0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.67 + time * 0.27, vec3(0.44, 0.49, 0.47), vec3(0.36, 0.48, 0.31), vec3(0.94, 1.02, 0.96), vec3(0.45, 0.72, 0.81));
	col = mod(col * 1.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
