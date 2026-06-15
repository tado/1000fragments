uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.10 - t * 3.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.03 * sin(mf + 3.0) + ph), cos(t * 1.03 * cos(mf + 3.0) + ph));
        ms += 0.090 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	{ float fr = length(p); p *= 1.0 + 0.40 * fr * fr; }
	p += vec2(-0.71, 0.04) * sin(length(p) * 3.18 - time * 1.69) * 0.40;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = d1 * d2;
	vec3 col = palette(d * 1.63 + time * 0.11, vec3(0.58, 0.41, 0.54), vec3(0.33, 0.30, 0.41), vec3(1.32, 0.78, 0.77), vec3(0.60, 0.61, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
