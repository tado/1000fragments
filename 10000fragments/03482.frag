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
        vec2 mm = vec2(sin(t * 1.83 * sin(mf + 3.0) + ph), cos(t * 1.83 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.12) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 2.04 + time * -0.19); }
	p = fract(p * 1.26) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.25);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.82 + time * 0.03, vec3(0.53, 0.53, 0.48), vec3(0.32, 0.40, 0.44), vec3(1.39, 0.83, 1.16), vec3(0.86, 0.25, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
