uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.49; vec2 jc = vec2(-0.63 + 0.3 * sin(t * 0.46 + ph), -0.66 + 0.3 * cos(t * 0.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	{ float fr = length(p); p *= 1.0 + -0.25 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 1.33 + time * 0.30); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(0.56) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.17 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
