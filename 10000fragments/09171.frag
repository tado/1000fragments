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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.42 * sin(mf + 3.0) + ph), cos(t * 2.42 * cos(mf + 3.0) + ph));
        ms += 0.080 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.32; p = rot2(0.57) * p; }
	p *= 2.08;
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.06, vec3(0.46, 0.45, 0.52), vec3(0.33, 0.47, 0.49), vec3(1.21, 1.01, 1.01), vec3(0.08, 0.64, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
