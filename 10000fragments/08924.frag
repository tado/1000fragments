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
        vec2 mm = vec2(sin(t * 2.05 * sin(mf + 3.0) + ph), cos(t * 2.05 * cos(mf + 3.0) + ph));
        ms += 0.080 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.88) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.07, vec3(0.50, 0.50, 0.54), vec3(0.42, 0.38, 0.44), vec3(0.79, 0.88, 1.04), vec3(0.96, 0.83, 0.70));
	col = fract(col * 2.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
