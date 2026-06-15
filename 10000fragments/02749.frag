uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.19 * sin(mf + 3.0) + ph), cos(t * 1.19 * cos(mf + 3.0) + ph));
        ms += 0.078 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.21 * cos(sa * 3 + t * 2.01 + ph);
    v = sin((sr - petal) * 9.64);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.07, -0.81) * sin(length(p) * 4.53 - time * 0.64) * 0.12;
	p *= 1.79;
	p = fract(p * 1.26) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.85 + time * 0.16, vec3(0.53, 0.48, 0.45), vec3(0.42, 0.32, 0.49), vec3(1.40, 0.91, 1.11), vec3(0.31, 0.37, 0.44));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
