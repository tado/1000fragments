uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.71;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.53; kp = rot2(2.09) * kp; kp *= 1.18; }
    v = sin(kp.y * 1.23 - t * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.30, -0.34) * sin(length(p) * 4.09 - time * 1.54) * 0.33;
	p = rot2(length(p) * 2.82 + time * 0.48) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(0.74) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.15, vec3(0.51, 0.51, 0.41), vec3(0.31, 0.38, 0.38), vec3(1.11, 1.01, 1.35), vec3(0.17, 0.22, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
