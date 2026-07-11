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
    v = sin(sa * 8.97 + sr * 8.92 - t * 1.85 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.95 + vec2(t * 0.86, -t * 0.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.67 * p.y + time * 0.63); p.y += 0.44 / wf * cos(wf * 3.09 * p.x + time * 0.92); }
	p = rot2(2.96) * p;
	p += vec2(-0.71, 0.79) * sin(length(p) * 2.55 - time * 1.68) * 0.23;
	{ p = vec2(atan(p.y, p.x) * 1.73, length(p) * 3.98 - time * 0.38); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.71 + time * 0.06, vec3(0.41, 0.46, 0.55), vec3(0.32, 0.36, 0.30), vec3(1.38, 0.79, 1.08), vec3(0.67, 0.37, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
