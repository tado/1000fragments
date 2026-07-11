uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 34.45 - t * 7.26 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 20.94 - t * 7.26 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.08 * sin(mf + 3.0) + ph), cos(t * 1.08 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.24; p = rot2(0.44) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.47);
	float d = d1 + d2;
	vec3 col = palette(d * 0.78 + time * 0.15, vec3(0.48, 0.41, 0.54), vec3(0.34, 0.31, 0.34), vec3(1.28, 0.81, 0.76), vec3(0.96, 0.13, 0.16));
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
