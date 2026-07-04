uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.07;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.53) * kp; kp *= 1.39; }
    v = sin(kp.y * 2.34 - t * 4.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 13.54;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.24 + time * 0.16, vec3(0.47, 0.40, 0.57), vec3(0.48, 0.50, 0.34), vec3(1.33, 0.81, 1.27), vec3(0.34, 0.07, 0.34)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
