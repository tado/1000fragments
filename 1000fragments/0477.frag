uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.30 + sin(p.y * 5.18 + t * 5.23) * 1.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	p = rot2(1.08) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -2.48 + time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.16, vec3(0.49, 0.51, 0.58), vec3(0.38, 0.39, 0.44), vec3(0.85, 1.37, 1.00), vec3(0.42, 0.20, 0.88));
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
