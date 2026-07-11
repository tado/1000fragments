uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 1.23 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 1.16 + time * 0.10); }
	p = fract(p * 2.14) - 0.5;
	p += vec2(-0.01, -0.38) * sin(length(p) * 5.92 - time * 0.62) * 0.22;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(0.35) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.27, vec3(0.41, 0.50, 0.54), vec3(0.31, 0.43, 0.32), vec3(0.86, 0.86, 0.72), vec3(0.84, 1.00, 0.91));
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
