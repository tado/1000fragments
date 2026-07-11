uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.38 - t * 8.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.60; p = rot2(1.69) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 2.26 - time * 0.72); }
	p = rot2(1.49) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.24, vec3(0.42, 0.47, 0.59), vec3(0.40, 0.32, 0.40), vec3(0.93, 1.29, 1.11), vec3(0.88, 0.59, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
