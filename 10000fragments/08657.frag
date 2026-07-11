uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.46 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.50 * sin(mf + 3.0) + ph), cos(t * 1.50 * cos(mf + 3.0) + ph));
        ms += 0.021 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.45 + time * 0.70); }
	p += vec2(-0.16, 0.57) * sin(length(p) * 4.58 - time * 1.96) * 0.38;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.42;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.53 + time * 0.28, vec3(0.51, 0.40, 0.40), vec3(0.32, 0.33, 0.34), vec3(1.29, 1.37, 1.32), vec3(0.77, 0.85, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
