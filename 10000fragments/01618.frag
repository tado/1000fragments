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
        vec2 mm = vec2(sin(t * 0.42 * sin(mf + 3.0) + ph), cos(t * 0.42 * cos(mf + 3.0) + ph));
        ms += 0.050 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 2.55 - time * 0.50); }
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.16, vec3(0.54, 0.57, 0.56), vec3(0.45, 0.34, 0.46), vec3(1.02, 0.99, 1.31), vec3(0.75, 0.01, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
