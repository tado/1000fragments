uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.37 * sin(mf + 3.0) + ph), cos(t * 2.37 * cos(mf + 3.0) + ph));
        ms += 0.020 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.14 + t * 3.07 + ph) + sin(p.y * 10.75 - t * 3.07 + ph)
        + sin((p.x + p.y) * 5.74 + t * 3.07 + ph) + sin(length(p) * 6.20 - t * 3.07 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p = abs(p) - 0.71;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 + d2;
	vec3 col = palette(d * 1.50 + time * 0.14, vec3(0.54, 0.59, 0.54), vec3(0.38, 0.39, 0.31), vec3(1.21, 1.26, 0.88), vec3(0.64, 0.10, 1.00));
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
