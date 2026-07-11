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
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.69 * sin(mf + 3.0) + ph), cos(t * 1.69 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p += vec2(-0.04, 0.88) * sin(length(p) * 5.49 - time * 0.82) * 0.37;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.18; p = rot2(1.25) * p; }
	p = rot2(1.43) * p;
	p *= 1.97;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.17, vec3(0.43, 0.44, 0.47), vec3(0.33, 0.47, 0.40), vec3(0.95, 0.74, 0.90), vec3(0.96, 0.57, 0.03));
	col = fract(col * 1.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
