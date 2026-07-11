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
    v = sin(sa * 7.40 + sr * 6.78 - t * 1.16 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 1.52 * p.y + time * 1.08); p.y += 0.47 / wf * cos(wf * 3.15 * p.x + time * 1.57); }
	p = rot2(time * 1.02) * p;
	p = rot2(length(p) * 3.53 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.10, vec3(0.55, 0.58, 0.41), vec3(0.36, 0.47, 0.48), vec3(0.93, 1.25, 1.18), vec3(0.25, 0.76, 0.32));
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
