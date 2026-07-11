uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.14 * sin(mf + 3.0) + ph), cos(t * 1.35 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.86);
    float gsh = hash21(vec2(grow, floor(t * 6.14))) - 0.5;
    float gx = p.x + gsh * 0.42;
    v = sin(gx * 7.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.47));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 1.10 + time * -0.62); }
	p = fract(p * 2.88) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = d1 + d2;
	vec3 col = palette(d * 1.58 + time * 0.18, vec3(0.59, 0.46, 0.58), vec3(0.37, 0.32, 0.32), vec3(1.05, 1.25, 0.95), vec3(0.52, 0.88, 0.85));
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
