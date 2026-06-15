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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.36 * sin(mf + 3.0) + ph), cos(t * 0.36 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(0.66) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.29, vec3(0.57, 0.44, 0.57), vec3(0.42, 0.36, 0.41), vec3(0.70, 1.29, 0.82), vec3(0.20, 0.49, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
