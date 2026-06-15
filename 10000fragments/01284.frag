uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.37, t * 2.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.22, vec3(0.43, 0.46, 0.44), vec3(0.36, 0.33, 0.38), vec3(1.14, 0.88, 1.01), vec3(0.51, 0.17, 0.34));
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
