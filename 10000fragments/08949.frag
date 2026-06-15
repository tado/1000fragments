uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.50 * sin(mf + 3.0) + ph), cos(t * 0.50 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 17.72 - t * 5.98 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 33.47 - t * 5.98 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 2.43 + time * -0.25); }
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.36 + time * 0.29, vec3(0.57, 0.42, 0.51), vec3(0.49, 0.35, 0.46), vec3(0.72, 0.97, 0.71), vec3(0.80, 0.52, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
