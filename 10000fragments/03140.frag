uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.38 + vec2(t * 1.66, -t * 1.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.29 + time * 0.25) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.03 * p.y + time * 1.91); p.y += 0.34 / wf * cos(wf * 1.93 * p.x + time * 1.42); }
	p = rot2(2.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.26, vec3(0.51, 0.49, 0.48), vec3(0.45, 0.33, 0.33), vec3(1.25, 0.73, 0.75), vec3(0.41, 0.63, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
