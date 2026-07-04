uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.02 + vec2(t * 0.61, -t * 2.96) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.05 * p.y + time * 1.44); p.y += 0.43 / wf * cos(wf * 2.20 * p.x + time * 1.64); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.18; p = rot2(0.45) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.46, 0.29), vec3(0.59, 0.52, 0.46), d);
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
