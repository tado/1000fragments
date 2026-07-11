uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.18 * cos(sa * 7 + t * 1.54 + ph);
    v = sin((sr - petal) * 19.01);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.23 + vec2(t * 0.45, -t * 0.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.47;
	p += vec2(0.04, -0.13) * sin(length(p) * 3.32 - time * 1.78) * 0.26;
	p = fract(p * 2.13) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.25, vec3(0.46, 0.46, 0.56), vec3(0.32, 0.32, 0.44), vec3(1.01, 1.10, 1.37), vec3(0.01, 0.11, 0.78));
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
