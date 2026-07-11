uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.72) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.54 + sr * 21.71 - t * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(2.07) * p;
	{ p = vec2(atan(p.y, p.x) * 2.02, length(p) * 4.36 - time * 0.70); }
	p += vec2(0.02, 0.59) * sin(length(p) * 5.74 - time * 1.67) * 0.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.81 + time * 0.10, vec3(0.45, 0.40, 0.47), vec3(0.44, 0.49, 0.33), vec3(0.81, 0.83, 1.17), vec3(0.46, 0.58, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
