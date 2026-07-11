uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.92;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.66; kp = rot2(1.81) * kp; kp *= 1.43; }
    v = sin(kp.y * 2.04 - t * 4.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p = abs(p) - 0.79;
	p *= 2.75;
	p = fract(p * 1.24) - 0.5;
	p = rot2(time * -1.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.11, vec3(0.48, 0.41, 0.54), vec3(0.45, 0.33, 0.37), vec3(0.86, 1.12, 1.14), vec3(0.44, 0.34, 0.65));
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
