uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.87) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 0.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.46 * sin(mf + 3.0) + ph), cos(t * 2.39 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	p.x += sin(p.y * 6.53 + time * 2.59) * 0.25;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.30; p = rot2(1.63) * p; }
	p = rot2(time * 0.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.34 + time * 0.16, vec3(0.56, 0.46, 0.41), vec3(0.40, 0.40, 0.46), vec3(0.80, 0.94, 1.19), vec3(0.92, 0.98, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
