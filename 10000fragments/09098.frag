uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.85; vec2 jc = vec2(-0.27 + 0.3 * sin(t * 1.39 + ph), -0.16 + 0.3 * cos(t * 1.39 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = fract(p * 2.95) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.09 + time * 0.11); }
	p = rot2(p.y * 2.72 + time * 0.80) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(1.24) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.40, 0.46), vec3(0.60, 0.94, 0.45), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
