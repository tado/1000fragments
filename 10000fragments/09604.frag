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
    v = sin(sa * 4.62 + sr * 8.44 - t * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 2.61 + time * 0.76) * p;
	p += vec2(-0.01, 0.82) * sin(length(p) * 4.99 - time * 1.86) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.24, vec3(0.42, 0.58, 0.49), vec3(0.36, 0.44, 0.39), vec3(1.16, 0.73, 1.03), vec3(0.52, 0.26, 0.58));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
