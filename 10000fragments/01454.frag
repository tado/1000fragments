uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.35 + vec2(t * 0.48, -t * 0.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	{ p = vec2(atan(p.y, p.x) * 2.45, length(p) * 5.08 - time * 0.57); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.84 * p.y + time * 1.22); p.y += 0.23 / wf * cos(wf * 2.13 * p.x + time * 1.77); }
	p = rot2(1.41) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.14, 0.37), vec3(0.82, 0.76, 0.66), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
