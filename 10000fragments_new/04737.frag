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
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.71; kp = rot2(1.26) * kp; kp *= 1.36; }
    v = sin(kp.y * 1.94 - t * 2.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	p = fract(p * 1.29) - 0.5;
	p = (floor(p * 24.7) + 0.5) / 24.7;
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.26, vec3(0.44, 0.52, 0.49), vec3(0.49, 0.32, 0.50), vec3(0.76, 1.22, 1.22), vec3(0.08, 0.30, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
