uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.86, t * 1.89 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = abs(p) - 0.52;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.24, vec3(0.55, 0.56, 0.42), vec3(0.46, 0.32, 0.36), vec3(1.28, 0.78, 1.05), vec3(0.11, 0.63, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
