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
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.95 * sin(mf + 3.0) + ph), cos(t * 1.95 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	p *= 1.58;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.27; p = rot2(1.87) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 2.86 + time * 0.13); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.24, vec3(0.49, 0.47, 0.44), vec3(0.30, 0.34, 0.44), vec3(0.93, 1.21, 1.11), vec3(0.24, 0.41, 0.98));
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
