uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.23 * cos(sa * 8.0 + t * 2.24 + ph);
    v = sin((sr - petal) * 13.35);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.48 * p.y + time * 2.09); p.y += 0.21 / wf * cos(wf * 2.53 * p.x + time * 1.88); }
	p = rot2(time * 0.56) * p;
	p = rot2(length(p) * 2.19 + time * 1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.19, vec3(0.47, 0.48, 0.40), vec3(0.39, 0.31, 0.38), vec3(1.37, 1.08, 1.24), vec3(0.96, 0.10, 0.46));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 1.67 + time * 11.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
