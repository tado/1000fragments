uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.76;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.69; kp = rot2(0.67) * kp; kp *= 1.15; }
    v = sin(kp.x * 3.31 - t * 2.53 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.79 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.47 + t * 3.90 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.86 + time * 0.18, vec3(0.52, 0.45, 0.40), vec3(0.39, 0.48, 0.42), vec3(1.08, 0.83, 1.40), vec3(0.71, 0.81, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
