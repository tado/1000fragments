uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.69 + vec2(t * 2.04, -t * 2.04) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.49 + vec2(t * 1.91, -t * 1.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 3.44 + time * 0.76) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.06 * p.y + time * 0.90); p.y += 0.44 / wf * cos(wf * 2.88 * p.x + time * 1.45); }
	p = fract(p * 2.32) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.10, vec3(0.43, 0.45, 0.56), vec3(0.47, 0.45, 0.35), vec3(1.31, 0.88, 0.93), vec3(0.44, 0.25, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
