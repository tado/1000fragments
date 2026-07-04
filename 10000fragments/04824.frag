uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(-0.22 + 0.3 * sin(t * 1.17 + ph), -0.77 + 0.3 * cos(t * 1.08 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = abs(p);
	p = rot2(p.y * 3.92 + time * 0.70) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.77 + time * -0.84); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.27, vec3(0.51, 0.43, 0.46), vec3(0.39, 0.41, 0.34), vec3(1.07, 0.79, 0.77), vec3(0.16, 0.52, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
