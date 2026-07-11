uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.77) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.95 * sin(mf + 3.0) + ph), cos(t * 0.95 * cos(mf + 3.0) + ph));
        ms += 0.051 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 2.72 + time * 0.45); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.12 * p.y + time * 1.83); p.y += 0.41 / wf * cos(wf * 2.78 * p.x + time * 1.56); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.30, vec3(0.58, 0.41, 0.53), vec3(0.32, 0.42, 0.47), vec3(1.00, 1.15, 1.06), vec3(0.96, 0.66, 0.97));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
