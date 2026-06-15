uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.18; vec2 jc = vec2(0.26 + 0.3 * sin(t * 1.35 + ph), -0.49 + 0.3 * cos(t * 1.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.66 * p.y + time * 1.79); p.y += 0.25 / wf * cos(wf * 2.73 * p.x + time * 1.46); }
	{ p = vec2(atan(p.y, p.x) * 2.70, length(p) * 2.71 - time * 0.77); }
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p += vec2(0.33, 0.31) * sin(length(p) * 2.76 - time * 0.95) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 1.30, 1.48) + vec3(0.02, 0.03, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
