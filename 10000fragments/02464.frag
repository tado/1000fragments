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
    float petal = 0.59 + 0.15 * cos(sa * 4 + t * 1.01 + ph);
    v = sin((sr - petal) * 11.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.22 * p.y + time * 1.27); p.y += 0.27 / wf * cos(wf * 1.66 * p.x + time * 1.15); }
	p = abs(p) - 0.33;
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 2.96 - time * 0.49); }
	p = rot2(p.y * -1.24 + time * 0.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.29, vec3(0.40, 0.49, 0.46), vec3(0.36, 0.39, 0.48), vec3(0.90, 0.73, 1.37), vec3(0.30, 0.55, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
