uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.69 + t * 3.08 + ph) + sin(p.y * 6.92 - t * 3.08 + ph)
        + sin((p.x + p.y) * 8.15 + t * 3.08 + ph) + sin(length(p) * 3.16 - t * 3.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.30, vec3(0.47, 0.46, 0.49), vec3(0.36, 0.33, 0.42), vec3(0.79, 0.99, 1.19), vec3(0.35, 0.22, 0.29));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
