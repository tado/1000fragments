uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.81;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.53) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 0.87) * sin(3.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.30 * sin(mf + 3.0) + ph), cos(t * 0.81 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	p *= 1.0 + 0.32 * sin(time * 1.48);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.74 + time * 0.17, vec3(0.54, 0.55, 0.42), vec3(0.33, 0.31, 0.46), vec3(0.87, 1.15, 0.86), vec3(0.39, 0.15, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
