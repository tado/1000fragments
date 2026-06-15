uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.38 + vec2(t * 1.31, -t * 1.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.46; p = rot2(1.45) * p; }
	p = rot2(1.25) * p;
	p = abs(p) - 0.37;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 1.79 * p.y + time * 1.96); p.y += 0.40 / wf * cos(wf * 2.43 * p.x + time * 1.19); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.21, vec3(0.49, 0.58, 0.40), vec3(0.36, 0.49, 0.47), vec3(0.83, 0.97, 1.29), vec3(0.61, 0.19, 0.20));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
