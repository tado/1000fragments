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
    v = sin(sa * 11.09 + sr * 4.50 - t * 0.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 3.20 + time * 0.13) * p;
	p += vec2(0.19, -0.62) * sin(length(p) * 4.86 - time * 0.68) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.11, vec3(0.49, 0.59, 0.50), vec3(0.40, 0.47, 0.49), vec3(1.02, 0.75, 0.90), vec3(0.84, 0.77, 0.05));
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
