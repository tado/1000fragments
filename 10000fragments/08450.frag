uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.09 * sin(mf + 3.0) + ph), cos(t * 1.09 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.13, vec3(0.46, 0.58, 0.41), vec3(0.49, 0.30, 0.41), vec3(0.84, 1.04, 1.28), vec3(0.24, 0.91, 0.10));
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
