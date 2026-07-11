uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.25; vec2 jc = vec2(-0.75 + 0.3 * sin(t * 0.59 + ph), -0.44 + 0.3 * cos(t * 0.59 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(0.87) * p; }
	p *= 3.11;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 1.88 + time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.34, 1.19, 0.80) + vec3(0.08, 0.03, 0.21);
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
