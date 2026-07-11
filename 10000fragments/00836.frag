uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.47 + sin(p.y * 2.82 + t * 1.34) * 3.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.05, -0.78) * sin(length(p) * 2.34 - time * 0.74) * 0.27;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.08, lr * 2.63 + time * -0.13); }
	p = rot2(0.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.15, vec3(0.59, 0.51, 0.52), vec3(0.36, 0.44, 0.36), vec3(1.14, 1.25, 1.33), vec3(0.31, 0.80, 0.18));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
