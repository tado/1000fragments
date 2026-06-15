uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.34 + t * 5.78 + ph) + sin(p.y * 5.31 - t * 1.36 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = rot2(p.y * -2.03 + time * 0.48) * p;
	p = rot2(2.56) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.78 * p.y + time * 1.42); p.y += 0.40 / wf * cos(wf * 2.29 * p.x + time * 1.12); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.09, vec3(0.46, 0.43, 0.45), vec3(0.31, 0.32, 0.49), vec3(1.20, 1.07, 1.28), vec3(0.39, 0.83, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
