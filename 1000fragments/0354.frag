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
        vec2 mm = vec2(sin(t * 2.22 * sin(mf + 3.0) + ph), cos(t * 2.22 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.08 + vec2(t * 0.80, -t * 0.80) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.58 + time * 0.12, vec3(0.41, 0.50, 0.42), vec3(0.41, 0.38, 0.39), vec3(0.89, 1.00, 0.87), vec3(0.61, 0.04, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
