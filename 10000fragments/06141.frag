uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.34 * sin(mf + 3.0) + ph), cos(t * 2.34 * cos(mf + 3.0) + ph));
        ms += 0.051 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.00 + t * 3.50 + ph) + sin(p.y * 16.66 - t * 2.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.48, 0.52, 0.47), vec3(0.31, 0.35, 0.39), vec3(1.27, 1.27, 1.13), vec3(0.43, 0.40, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
