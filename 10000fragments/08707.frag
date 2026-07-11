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
        vec2 mm = vec2(sin(t * 1.49 * sin(mf + 3.0) + ph), cos(t * 1.49 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.79 + t * 5.68 + ph) + sin(p.y * 7.58 - t * 1.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = d1 + d2;
	vec3 col = palette(d * 0.98 + time * 0.01, vec3(0.51, 0.51, 0.59), vec3(0.36, 0.41, 0.31), vec3(1.11, 1.19, 1.00), vec3(0.59, 0.42, 0.43));
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
