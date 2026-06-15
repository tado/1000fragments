uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.47 + vec2(t * 1.16, -t * 1.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.76;
	p = rot2(length(p) * 1.58 + time * 1.19) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.80 * p.y + time * 1.77); p.y += 0.35 / wf * cos(wf * 2.04 * p.x + time * 1.75); }
	{ p = vec2(atan(p.y, p.x) * 1.84, length(p) * 3.78 - time * 0.43); }
	p = rot2(p.y * 2.84 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.73 + time * 0.08);
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
