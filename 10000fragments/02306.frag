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
    v = sin(sa * 11.64 + sr * 9.99 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -1.91 + time * 0.20) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.93 * p.y + time * 1.29); p.y += 0.33 / wf * cos(wf * 3.43 * p.x + time * 1.54); }
	p = rot2(length(p) * 1.02 + time * 0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.28, vec3(0.48, 0.46, 0.59), vec3(0.36, 0.34, 0.49), vec3(1.14, 1.27, 0.98), vec3(0.79, 0.12, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
