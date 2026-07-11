uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.97 + vec2(t * 2.51, -t * 2.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.49 * sin(mf + 3.0) + ph), cos(t * 1.49 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 1.70 + time * 0.36); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.20, vec3(0.59, 0.56, 0.53), vec3(0.41, 0.44, 0.34), vec3(1.10, 1.40, 1.07), vec3(0.56, 0.15, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
