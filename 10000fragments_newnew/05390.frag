uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.27;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.47; kp = rot2(1.53) * kp; kp *= 1.30; }
    v = sin(kp.x * 2.08 - t * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.28) * p * 11.10;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.04 + time * 0.03, vec3(0.54, 0.48, 0.49), vec3(0.44, 0.48, 0.47), vec3(0.77, 1.28, 0.73), vec3(0.43, 0.01, 0.76)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
