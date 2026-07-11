uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.01, t * 0.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 6.78 + time * 3.62) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.03, vec3(0.42, 0.51, 0.58), vec3(0.50, 0.32, 0.41), vec3(1.19, 1.04, 0.85), vec3(0.15, 0.03, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
