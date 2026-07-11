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
        vec2 mm = vec2(sin(t * 0.49 * sin(mf + 3.0) + ph), cos(t * 0.49 * cos(mf + 3.0) + ph));
        ms += 0.070 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.26 * cos(sa * 8 + t * 2.50 + ph);
    v = sin((sr - petal) * 10.19);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	p *= 1.34;
	p += vec2(0.93, 0.16) * sin(length(p) * 5.34 - time * 0.90) * 0.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.31, lr * 1.53 + time * -0.14); }
	{ p = vec2(atan(p.y, p.x) * 2.02, length(p) * 3.07 - time * 0.60); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.66 + time * 0.06, vec3(0.57, 0.44, 0.44), vec3(0.48, 0.34, 0.44), vec3(0.93, 0.97, 1.23), vec3(0.77, 0.06, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
