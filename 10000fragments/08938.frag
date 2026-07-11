uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.47 + vec2(t * 2.23, -t * 2.23) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.42 * sin(mf + 3.0) + ph), cos(t * 0.42 * cos(mf + 3.0) + ph));
        ms += 0.072 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(0.84) * p; }
	p = rot2(time * 0.41) * p;
	p = fract(p * 1.05) - 0.5;
	p = rot2(p.y * -2.36 + time * 0.68) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.10 + time * 0.28, vec3(0.49, 0.57, 0.45), vec3(0.47, 0.40, 0.31), vec3(1.07, 1.09, 0.88), vec3(0.44, 0.92, 0.27));
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
