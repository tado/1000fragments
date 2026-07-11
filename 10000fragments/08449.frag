uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 9.82 - t * 7.31 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 19.57 - t * 7.31 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.21 * sin(mf + 3.0) + ph), cos(t * 2.21 * cos(mf + 3.0) + ph));
        ms += 0.077 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.28, lr * 2.46 + time * 0.72); }
	p = abs(p);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(0.70) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.15, vec3(0.44, 0.45, 0.50), vec3(0.32, 0.37, 0.47), vec3(1.25, 0.96, 1.34), vec3(0.75, 0.54, 0.85));
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
