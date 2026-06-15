uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.65 + vec2(t * 1.71, -t * 1.71) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 24.91 - t * 4.16 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 33.56 - t * 4.16 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	p *= 2.41;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.08, vec3(0.41, 0.46, 0.53), vec3(0.35, 0.39, 0.34), vec3(1.20, 1.28, 1.18), vec3(0.98, 0.88, 0.68));
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
