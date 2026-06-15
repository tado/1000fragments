uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.60, t * 2.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.35 + t * 2.70 + ph) + sin(p.y * 9.40 - t * 2.70 + ph)
        + sin((p.x + p.y) * 5.38 + t * 2.70 + ph) + sin(length(p) * 7.80 - t * 2.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = d1 * d2;
	vec3 col = palette(d * 1.65 + time * 0.24, vec3(0.47, 0.43, 0.59), vec3(0.39, 0.34, 0.30), vec3(1.25, 1.03, 0.81), vec3(0.22, 0.88, 0.28));
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
