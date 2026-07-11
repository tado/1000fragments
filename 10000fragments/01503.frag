uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.09 - t * 5.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.13 * p.y + time * 0.87); p.y += 0.26 / wf * cos(wf * 3.01 * p.x + time * 1.84); }
	p = rot2(length(p) * -1.71 + time * 1.09) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.11, vec3(0.57, 0.52, 0.47), vec3(0.45, 0.31, 0.44), vec3(0.83, 1.19, 0.99), vec3(0.26, 0.54, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
