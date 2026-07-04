uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.30 - t * 2.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.18 + vec2(t * 1.22, -t * 1.96) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = fract(p * 1.29) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = d1 * d2;
	vec3 col = palette(d * 0.60 + time * 0.28, vec3(0.41, 0.54, 0.55), vec3(0.43, 0.34, 0.38), vec3(1.29, 0.93, 1.39), vec3(0.77, 0.83, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
