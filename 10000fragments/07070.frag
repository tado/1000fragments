uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.37 * sin(mf + 3.0) + ph), cos(t * 2.37 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.30 + sr * 15.87 - t * 2.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 5.86 - time * 0.76); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.61 + time * 0.02, vec3(0.59, 0.49, 0.60), vec3(0.47, 0.40, 0.44), vec3(0.95, 1.26, 0.97), vec3(0.64, 0.07, 0.80));
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
