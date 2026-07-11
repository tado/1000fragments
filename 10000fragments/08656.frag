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
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.42 * sin(mf + 3.0) + ph), cos(t * 1.42 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.24; p = rot2(1.34) * p; }
	p = rot2(length(p) * 1.81 + time * 0.25) * p;
	p = rot2(p.y * 2.03 + time * 0.74) * p;
	p = rot2(0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.14, vec3(0.48, 0.49, 0.44), vec3(0.32, 0.38, 0.42), vec3(1.00, 1.11, 1.32), vec3(0.20, 0.79, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
