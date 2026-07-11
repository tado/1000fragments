uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.62 * sin(mf + 3.0) + ph), cos(t * 1.62 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.97 + time * -0.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.13, vec3(0.46, 0.52, 0.54), vec3(0.36, 0.43, 0.46), vec3(1.29, 0.83, 1.14), vec3(0.84, 0.68, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
