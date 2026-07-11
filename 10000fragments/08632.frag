uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.89 * sin(mf + 3.0) + ph), cos(t * 0.89 * cos(mf + 3.0) + ph));
        ms += 0.084 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	p *= 1.87;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.04, vec3(0.55, 0.47, 0.45), vec3(0.44, 0.31, 0.35), vec3(0.95, 1.40, 0.81), vec3(0.56, 0.17, 0.80));
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
