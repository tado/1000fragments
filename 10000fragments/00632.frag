uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.26 + t * 1.21 + ph) + sin(p.y * 13.62 - t * 1.21 + ph)
        + sin((p.x + p.y) * 10.40 + t * 1.21 + ph) + sin(length(p) * 8.22 - t * 1.21 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.33, t * 1.84 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.08, vec3(0.56, 0.50, 0.52), vec3(0.50, 0.50, 0.39), vec3(1.04, 1.32, 0.97), vec3(0.06, 0.71, 0.23));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
