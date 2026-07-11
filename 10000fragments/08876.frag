uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.43 + t * 1.04 + ph) + sin(p.y * 5.43 - t * 1.04 + ph)
        + sin((p.x + p.y) * 2.04 + t * 1.04 + ph) + sin(length(p) * 11.34 - t * 1.04 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.45 * sin(mf + 3.0) + ph), cos(t * 0.45 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.15 + time * 0.15, vec3(0.57, 0.56, 0.45), vec3(0.47, 0.38, 0.37), vec3(1.08, 0.84, 0.90), vec3(0.50, 0.94, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
