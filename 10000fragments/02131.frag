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
        vec2 mm = vec2(sin(t * 2.43 * sin(mf + 3.0) + ph), cos(t * 2.43 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.85 + t * 1.35 + ph) + sin(p.y * 10.86 - t * 1.35 + ph)
        + sin((p.x + p.y) * 7.45 + t * 1.35 + ph) + sin(length(p) * 13.29 - t * 1.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.05 + time * 0.28, vec3(0.50, 0.48, 0.55), vec3(0.30, 0.35, 0.40), vec3(1.30, 1.37, 1.22), vec3(0.66, 0.71, 0.23));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
