uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.33 * sin(mf + 3.0) + ph), cos(t * 0.33 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.13 + vec2(t * 1.06, -t * 1.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	p = fract(p * 1.68) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.17, vec3(0.45, 0.57, 0.47), vec3(0.34, 0.45, 0.33), vec3(1.35, 1.33, 0.98), vec3(0.21, 0.31, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
