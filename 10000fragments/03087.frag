uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.09 + vec2(t * 0.31, -t * 0.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	p = rot2(time * 0.62) * p;
	p = rot2(1.81) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.41 * p.y + time * 1.83); p.y += 0.49 / wf * cos(wf * 2.37 * p.x + time * 0.96); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.09, vec3(0.53, 0.52, 0.45), vec3(0.45, 0.43, 0.42), vec3(1.15, 0.93, 1.08), vec3(0.29, 0.94, 0.78));
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
