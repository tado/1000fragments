uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.91 + sin(p.y * 1.03 + t * 5.25) * 3.22 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.43, t * 1.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.46 + time * 0.03, vec3(0.52, 0.46, 0.56), vec3(0.35, 0.34, 0.37), vec3(1.20, 0.93, 0.99), vec3(0.23, 0.47, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
