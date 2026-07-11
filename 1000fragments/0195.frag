uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.30 * sin(mf + 3.0) + ph), cos(t * 2.30 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p *= 1.47;
	p += vec2(0.04, 0.38) * sin(length(p) * 5.37 - time * 1.36) * 0.31;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.04, vec3(0.54, 0.47, 0.48), vec3(0.49, 0.43, 0.42), vec3(1.26, 1.23, 0.82), vec3(0.31, 0.04, 0.23));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
