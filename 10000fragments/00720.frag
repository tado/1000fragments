uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.93 + vec2(t * 0.88, -t * 0.88) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.35;
	p = rot2(time * -1.17) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.03 * p.y + time * 1.68); p.y += 0.41 / wf * cos(wf * 2.28 * p.x + time * 1.26); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.05, vec3(0.56, 0.58, 0.52), vec3(0.44, 0.42, 0.50), vec3(0.86, 1.40, 1.10), vec3(0.54, 0.02, 0.37));
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
