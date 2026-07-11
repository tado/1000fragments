uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.30;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.41; kp = rot2(0.54) * kp; kp *= 1.28; }
    v = sin(kp.x * 1.22 - t * 2.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.23, vec3(0.60, 0.46, 0.55), vec3(0.43, 0.46, 0.33), vec3(1.10, 1.18, 0.83), vec3(0.88, 0.32, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
