uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.63 + t * 5.28 + ph) + sin(p.y * 6.66 - t * 5.51 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.84 + t * 3.92 + ph) + sin(p.y * 17.68 - t * 3.75 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.13, vec3(0.55, 0.57, 0.41), vec3(0.42, 0.36, 0.48), vec3(1.08, 0.70, 0.97), vec3(0.22, 0.97, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
