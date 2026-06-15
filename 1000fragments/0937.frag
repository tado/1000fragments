uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.67 - t * 1.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.87 + time * 1.06) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.20, vec3(0.56, 0.59, 0.47), vec3(0.46, 0.47, 0.49), vec3(1.29, 1.28, 0.80), vec3(0.61, 0.42, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
