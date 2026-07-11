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
        vec2 mm = vec2(sin(t * 1.87 * sin(mf + 3.0) + ph), cos(t * 0.65 * cos(mf + 3.0) + ph));
        ms += 0.036 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.53 + vec2(t * 0.77, -t * 1.78) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.15, vec3(0.45, 0.53, 0.57), vec3(0.38, 0.35, 0.47), vec3(1.40, 0.88, 0.72), vec3(0.73, 0.59, 0.79));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
