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
        vec2 mm = vec2(sin(t * 2.46 * sin(mf + 3.0) + ph), cos(t * 2.46 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.39 - t * 1.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.82 + time * 0.18, vec3(0.55, 0.59, 0.53), vec3(0.48, 0.44, 0.31), vec3(0.88, 0.75, 1.23), vec3(0.55, 0.91, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
