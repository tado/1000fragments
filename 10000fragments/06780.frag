uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.94, t * 1.57 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.04 + t * 1.33 + ph) + sin(p.y * 12.11 - t * 1.33 + ph)
        + sin((p.x + p.y) * 5.98 + t * 1.33 + ph) + sin(length(p) * 12.91 - t * 1.33 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = d1 * d2;
	vec3 col = palette(d * 1.67 + time * 0.12, vec3(0.55, 0.53, 0.52), vec3(0.39, 0.32, 0.41), vec3(0.96, 1.27, 1.19), vec3(0.90, 0.08, 0.98));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
