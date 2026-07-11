uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.83, t * 2.20 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p += vec2(0.07, -0.63) * sin(length(p) * 2.87 - time * 1.78) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.27 + time * 0.12, vec3(0.47, 0.47, 0.59), vec3(0.46, 0.36, 0.34), vec3(0.92, 1.25, 0.88), vec3(0.61, 0.39, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
