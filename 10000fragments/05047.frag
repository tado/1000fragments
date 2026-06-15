uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.48, t * 2.28 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.42 * p.y + time * 1.70); p.y += 0.44 / wf * cos(wf * 2.24 * p.x + time * 0.70); }
	p = rot2(length(p) * 2.64 + time * 0.65) * p;
	p = fract(p * 1.55) - 0.5;
	p = rot2(time * -0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.17, vec3(0.60, 0.53, 0.60), vec3(0.31, 0.34, 0.41), vec3(1.10, 0.75, 1.30), vec3(0.55, 0.57, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
