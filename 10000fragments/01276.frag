uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.33 + t * 3.26 + ph) + sin(p.y * 7.47 - t * 3.26 + ph)
        + sin((p.x + p.y) * 9.38 + t * 3.26 + ph) + sin(length(p) * 6.37 - t * 3.26 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.61 + t * 3.55 + ph) + sin(p.y * 2.49 - t * 3.55 + ph)
        + sin((p.x + p.y) * 6.67 + t * 3.55 + ph) + sin(length(p) * 7.47 - t * 3.55 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = d1 + d2;
	vec3 col = palette(d * 1.35 + time * 0.22, vec3(0.52, 0.42, 0.53), vec3(0.39, 0.42, 0.41), vec3(1.37, 0.73, 1.00), vec3(0.55, 0.15, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
