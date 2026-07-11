uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.52 + sin(p.y * 1.51 + t * 4.47) * 4.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.11 + 0.3 * sin(t * 1.66 + ph), 0.44 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.58 * p.y + time * 2.07); p.y += 0.30 / wf * cos(wf * 2.45 * p.x + time * 2.15); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 1.10 + time * -0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.27);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.72 + time * 0.27, vec3(0.47, 0.50, 0.49), vec3(0.33, 0.33, 0.47), vec3(1.34, 1.10, 0.99), vec3(0.63, 0.12, 0.75));
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
