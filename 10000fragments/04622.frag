uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.95 + vec2(t * 1.54, -t * 2.24) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.79 * sin(mf + 3.0) + ph), cos(t * 1.89 * cos(mf + 3.0) + ph));
        ms += 0.059 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.55 + time * 0.19, vec3(0.52, 0.51, 0.52), vec3(0.48, 0.37, 0.36), vec3(1.04, 1.39, 0.90), vec3(0.35, 0.35, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
