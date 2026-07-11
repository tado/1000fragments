uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.00, t * 1.79 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.09, vec3(0.58, 0.44, 0.58), vec3(0.38, 0.48, 0.44), vec3(1.39, 1.17, 1.02), vec3(0.51, 0.59, 0.43));
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
