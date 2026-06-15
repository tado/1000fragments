uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.27 * sin(mf + 3.0) + ph), cos(t * 2.27 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 10.61 - t * 4.70 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 27.61 - t * 4.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	p = fract(p * 1.16) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.11 + time * 0.01, vec3(0.44, 0.53, 0.46), vec3(0.34, 0.40, 0.31), vec3(0.88, 0.76, 1.11), vec3(0.60, 0.16, 0.14));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
