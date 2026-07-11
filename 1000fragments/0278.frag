uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.95 * sin(mf + 3.0) + ph), cos(t * 1.95 * cos(mf + 3.0) + ph));
        ms += 0.033 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p = fract(p * 2.04) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.02, vec3(0.43, 0.51, 0.57), vec3(0.37, 0.33, 0.47), vec3(0.76, 1.10, 1.10), vec3(0.78, 0.55, 0.38));
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
