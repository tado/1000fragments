uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.31 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.089 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.29 * cos(sa * 5 + t * 2.30 + ph);
    v = sin((sr - petal) * 6.74);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	p = fract(p * 2.86) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.19 + time * 0.17, vec3(0.44, 0.50, 0.47), vec3(0.47, 0.33, 0.48), vec3(1.30, 1.07, 0.75), vec3(0.32, 0.55, 0.50));
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
