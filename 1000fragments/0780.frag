uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.94 + vec2(t * 2.94, -t * 2.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.61 + sr * 20.71 - t * 3.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p = fract(p * 2.72) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.25 + time * 0.16, vec3(0.50, 0.48, 0.41), vec3(0.43, 0.47, 0.48), vec3(1.18, 1.23, 1.14), vec3(0.52, 0.88, 0.05));
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
