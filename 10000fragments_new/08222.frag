uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.08;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.60; kp = rot2(1.76) * kp; kp *= 1.29; }
    v = sin(kp.y * 1.78 - t * 1.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.85 + time * 0.36) * p;
	p = fract(p * 2.93) - 0.5;
	p = (floor(p * 7.1) + 0.5) / 7.1;
	p = rot2(time * -1.57) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.01, vec3(0.48, 0.46, 0.40), vec3(0.38, 0.34, 0.38), vec3(1.09, 0.85, 1.34), vec3(0.49, 0.99, 0.23));
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
