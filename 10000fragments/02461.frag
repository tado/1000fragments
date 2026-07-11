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
    float petal = 0.34 + 0.12 * cos(sa * 7 + t * 2.83 + ph);
    v = sin((sr - petal) * 8.92);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.00, length(p) * 3.75 - time * 0.18); }
	p = rot2(length(p) * 4.00 + time * 0.53) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.66 * p.y + time * 1.71); p.y += 0.48 / wf * cos(wf * 2.41 * p.x + time * 1.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.24, vec3(0.51, 0.44, 0.42), vec3(0.46, 0.33, 0.38), vec3(0.88, 0.81, 0.92), vec3(0.36, 0.33, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
