uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.09 * sin(mf + 3.0) + ph), cos(t * 2.09 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.80;
	p += vec2(-0.48, 0.98) * sin(length(p) * 5.41 - time * 0.61) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.03, vec3(0.51, 0.55, 0.56), vec3(0.43, 0.39, 0.49), vec3(0.82, 0.78, 1.13), vec3(0.44, 0.46, 0.96));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
