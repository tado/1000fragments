uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.03;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.47; kp = rot2(1.72) * kp; kp *= 1.43; }
    v = sin(kp.y * 3.05 - t * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.09, vec3(0.59, 0.49, 0.54), vec3(0.33, 0.31, 0.42), vec3(1.10, 1.03, 0.79), vec3(0.48, 0.60, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
