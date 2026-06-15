uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.55 + t * 1.66 + ph) + sin(p.y * 11.61 - t * 1.66 + ph)
        + sin((p.x + p.y) * 6.66 + t * 1.66 + ph) + sin(length(p) * 11.86 - t * 1.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.22, vec3(0.49, 0.47, 0.45), vec3(0.47, 0.39, 0.35), vec3(1.17, 1.12, 1.10), vec3(0.93, 0.05, 0.16));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
