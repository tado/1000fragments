uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.46) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 3.53 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.88 * sin(mf + 3.0) + ph), cos(t * 1.88 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.11 + time * 0.43) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(2.34) * p; }
	p *= 1.57;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = d1 * d2;
	vec3 col = palette(d * 0.57 + time * 0.11, vec3(0.58, 0.55, 0.58), vec3(0.44, 0.42, 0.48), vec3(1.08, 1.03, 1.38), vec3(0.17, 0.27, 0.86));
	col = fract(col * 2.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
