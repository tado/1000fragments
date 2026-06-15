uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.67 - t * 5.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 2.38 - time * 0.32); }
	p = rot2(p.y * 1.80 + time * 0.29) * p;
	p = rot2(length(p) * -3.24 + time * 0.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.11, vec3(0.46, 0.48, 0.53), vec3(0.36, 0.34, 0.42), vec3(1.08, 1.27, 0.82), vec3(0.67, 0.73, 0.06));
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
