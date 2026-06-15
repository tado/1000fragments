uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.67 * sin(mf + 3.0) + ph), cos(t * 1.67 * cos(mf + 3.0) + ph));
        ms += 0.060 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.00 + sin(p.y * 4.00 + t * 4.16) * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = d1 + d2;
	vec3 col = palette(d * 0.69 + time * 0.25, vec3(0.40, 0.53, 0.58), vec3(0.35, 0.31, 0.46), vec3(0.79, 0.79, 1.13), vec3(0.23, 0.63, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
