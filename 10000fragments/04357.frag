uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.64 + t * 4.06 + ph) + sin(p.y * 16.47 - t * 0.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.29 + sin(p.y * 1.88 + t * 4.62) * 2.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -3.80 + time * 0.26) * p;
	p += vec2(-0.91, 0.92) * sin(length(p) * 3.33 - time * 1.61) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.81 + time * 0.17, vec3(0.51, 0.57, 0.57), vec3(0.43, 0.39, 0.33), vec3(1.04, 0.79, 1.27), vec3(0.28, 0.98, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
