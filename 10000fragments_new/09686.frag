uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.35, t * 0.63 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	p = fract(p * 2.69) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.01, length(p) * 3.66 - time * 0.53); }
	p *= 2.46;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.28, vec3(0.46, 0.55, 0.55), vec3(0.33, 0.35, 0.37), vec3(1.16, 1.30, 0.81), vec3(0.30, 0.67, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
