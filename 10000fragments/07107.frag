uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.04, t * 1.92 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p = fract(p * 2.73) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.65 * p.y + time * 1.71); p.y += 0.37 / wf * cos(wf * 2.18 * p.x + time * 1.84); }
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 2.66 - time * 0.23); }
	p = rot2(time * -0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.05, vec3(0.52, 0.43, 0.46), vec3(0.42, 0.37, 0.41), vec3(0.91, 0.77, 0.75), vec3(0.90, 0.24, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
