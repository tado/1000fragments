uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.31 + t * 2.06 + ph) + sin(p.y * 11.50 - t * 2.06 + ph)
        + sin((p.x + p.y) * 6.51 + t * 2.06 + ph) + sin(length(p) * 15.65 - t * 2.06 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.44 * sin(mf + 3.0) + ph), cos(t * 2.44 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.79 + time * 0.20, vec3(0.48, 0.51, 0.57), vec3(0.49, 0.44, 0.45), vec3(1.39, 1.23, 0.76), vec3(0.66, 0.90, 0.20));
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
