uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.42;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.68; kp = rot2(0.79) * kp; kp *= 1.41; }
    v = sin(kp.x * 2.33 - t * 4.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.66 + sin(p.y * 5.51 + t * 3.63) * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.48) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.19 + time * 0.18, vec3(0.45, 0.41, 0.52), vec3(0.33, 0.47, 0.44), vec3(0.86, 0.91, 1.10), vec3(0.56, 0.97, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
