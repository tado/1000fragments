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
        vec2 mm = vec2(sin(t * 1.29 * sin(mf + 3.0) + ph), cos(t * 1.29 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 39.35 - t * 6.49 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 9.85 - t * 6.49 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	p = rot2(length(p) * -2.09 + time * 0.47) * p;
	p *= 1.69;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.48 + time * 0.19, vec3(0.54, 0.53, 0.41), vec3(0.43, 0.44, 0.39), vec3(1.05, 1.28, 0.76), vec3(0.65, 0.20, 0.35));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
