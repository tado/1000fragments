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
        vec2 mm = vec2(sin(t * 1.46 * sin(mf + 3.0) + ph), cos(t * 1.46 * cos(mf + 3.0) + ph));
        ms += 0.078 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 5.01 - time * 0.22); }
	p += vec2(-0.80, 0.71) * sin(length(p) * 4.44 - time * 1.27) * 0.23;
	p = fract(p * 2.48) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.04, vec3(0.55, 0.46, 0.43), vec3(0.36, 0.49, 0.49), vec3(1.39, 0.77, 0.93), vec3(0.91, 0.28, 0.43));
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
