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
    v = sin(sa * 11.34 + sr * 23.29 - t * 2.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	p = abs(p) - 0.28;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 1.30) * p;
	{ p = vec2(atan(p.y, p.x) * 2.89, length(p) * 5.60 - time * 0.20); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.19, vec3(0.43, 0.40, 0.50), vec3(0.41, 0.37, 0.41), vec3(1.31, 0.77, 0.94), vec3(0.76, 0.62, 0.13));
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
