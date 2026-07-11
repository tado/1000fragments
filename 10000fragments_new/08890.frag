uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.66; kp = rot2(2.27) * kp; kp *= 1.27; }
    v = sin(kp.y * 3.82 - t * 4.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.12) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.11 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.73) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.94 + time * 0.26, vec3(0.51, 0.56, 0.40), vec3(0.31, 0.44, 0.35), vec3(0.98, 1.29, 0.95), vec3(0.75, 0.09, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
