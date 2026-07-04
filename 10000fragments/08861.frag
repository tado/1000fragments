uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.88 + t * 1.12) - 0.5) * 2.0;
    v = sin((p.y * 2.33 + zx * 1.49 + t * 1.17) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.66;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.52; kp = rot2(2.64) * kp; kp *= 1.45; }
    v = sin(kp.y * 2.19 - t * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 4.29 - time * 0.39); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.69; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.11 + time * 0.28, vec3(0.55, 0.43, 0.57), vec3(0.32, 0.48, 0.49), vec3(1.21, 0.74, 1.34), vec3(0.92, 0.25, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
