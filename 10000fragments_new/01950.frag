uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 16.99 - t * 4.39 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 35.72 - t * 4.69 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.65 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.04 + t * 1.75 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = d1 + d2;
	vec3 col = palette(d * 1.45 + time * 0.07, vec3(0.43, 0.45, 0.58), vec3(0.47, 0.49, 0.45), vec3(1.31, 0.89, 1.17), vec3(0.35, 0.99, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
