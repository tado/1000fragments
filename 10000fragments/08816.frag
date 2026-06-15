uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(-0.37 + 0.3 * sin(t * 1.07 + ph), -0.74 + 0.3 * cos(t * 1.07 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.52, lr * 2.09 + time * 0.46); }
	p = rot2(p.y * -3.86 + time * 0.37) * p;
	{ p = vec2(atan(p.y, p.x) * 1.75, length(p) * 3.85 - time * 0.50); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.19, vec3(0.59, 0.54, 0.44), vec3(0.41, 0.50, 0.33), vec3(0.76, 1.33, 0.83), vec3(0.65, 0.81, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
