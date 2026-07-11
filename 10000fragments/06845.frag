uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.57 - t * 7.87 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.43, t * 1.64 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = d1 * d2;
	vec3 col = palette(d * 1.67 + time * 0.15, vec3(0.54, 0.52, 0.59), vec3(0.44, 0.40, 0.32), vec3(0.75, 0.98, 1.06), vec3(0.02, 0.30, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
