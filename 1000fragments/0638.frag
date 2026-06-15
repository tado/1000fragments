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
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.53 * sin(mf + 3.0) + ph), cos(t * 0.53 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.52 + vec2(t * 2.36, -t * 2.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -0.29) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.99 + time * 0.08, vec3(0.51, 0.58, 0.48), vec3(0.43, 0.40, 0.30), vec3(0.89, 1.16, 1.16), vec3(0.35, 0.07, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
