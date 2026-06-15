uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.62 + vec2(t * 0.50, -t * 0.50) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.98, t * 2.35 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.07, vec3(0.42, 0.52, 0.42), vec3(0.36, 0.38, 0.31), vec3(1.35, 1.03, 0.96), vec3(0.08, 0.79, 0.28));
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
