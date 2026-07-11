uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.80;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.41; kp = rot2(1.56) * kp; kp *= 1.32; }
    v = sin(kp.y * 1.70 - t * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.10, length(p) * 2.38 - time * 0.24); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.11, vec3(0.47, 0.40, 0.55), vec3(0.38, 0.32, 0.44), vec3(1.02, 0.99, 0.73), vec3(0.85, 0.81, 0.46));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
