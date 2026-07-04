uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.12);
    float gsh = hash21(vec2(grow, floor(t * 6.80))) - 0.5;
    float gx = p.x + gsh * 0.44;
    v = sin(gx * 16.73 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.42));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.64 * sin(mf + 3.0) + ph), cos(t * 1.94 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	p.y += sin(p.x * 3.63 + time * 1.70) * 0.35;
	p += vec2(0.33, 0.24) * sin(length(p) * 4.17 - time * 1.96) * 0.31;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(0.42) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = d1 + d2;
	vec3 col = palette(d * 1.36 + time * 0.01, vec3(0.57, 0.52, 0.55), vec3(0.44, 0.48, 0.42), vec3(0.88, 0.88, 0.84), vec3(0.94, 0.75, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
