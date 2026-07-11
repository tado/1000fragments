uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.34 * sin(mf + 3.0) + ph), cos(t * 0.34 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 1.95 + time * -0.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.05, vec3(0.57, 0.57, 0.53), vec3(0.45, 0.36, 0.31), vec3(1.16, 0.95, 1.17), vec3(0.40, 0.46, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
