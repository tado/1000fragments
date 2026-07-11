uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.66 + sin(p.y * 1.55 + t * 2.90) * 2.36 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.47 * sin(mf + 3.0) + ph), cos(t * 1.20 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.18 + time * 0.86); }
	p = (floor(p * 10.8) + 0.5) / 10.8;
	p += vec2(0.75, -0.48) * sin(length(p) * 5.87 - time * 1.19) * 0.31;
	p = fract(p * 1.50) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = d1 + d2;
	vec3 col = palette(d * 1.15 + time * 0.03, vec3(0.55, 0.51, 0.59), vec3(0.41, 0.38, 0.37), vec3(1.27, 1.34, 1.35), vec3(0.32, 0.26, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
