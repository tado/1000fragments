uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 1.41 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.65 + t * 5.57 + ph) + sin(p.y * 13.44 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.06, vec3(0.49, 0.43, 0.56), vec3(0.32, 0.48, 0.49), vec3(1.32, 0.95, 1.26), vec3(0.10, 0.02, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
