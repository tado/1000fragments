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
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.95 * sin(mf + 3.0) + ph), cos(t * 0.95 * cos(mf + 3.0) + ph));
        ms += 0.024 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.14 + vec2(t * 2.92, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	p = rot2(length(p) * -1.98 + time * 0.29) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(0.46) * p; }
	p *= 2.27;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.64);
	float d = d1 * d2;
	vec3 col = palette(d * 0.69 + time * 0.21, vec3(0.52, 0.57, 0.46), vec3(0.37, 0.42, 0.41), vec3(0.94, 0.83, 0.79), vec3(0.60, 0.43, 0.33));
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
