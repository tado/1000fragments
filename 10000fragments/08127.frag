uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 10.76 - t * 7.60 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 21.75 - t * 7.60 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.72 * sin(mf + 3.0) + ph), cos(t * 0.72 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(1.68) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = d1 * d2;
	vec3 col = palette(d * 0.67 + time * 0.07, vec3(0.54, 0.58, 0.43), vec3(0.44, 0.37, 0.37), vec3(1.11, 1.36, 0.93), vec3(0.33, 0.71, 0.78));
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
