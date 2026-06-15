uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.84 + t * 4.75 + ph) + sin(p.y * 11.30 - t * 4.75 + ph)
        + sin((p.x + p.y) * 11.28 + t * 4.75 + ph) + sin(length(p) * 15.27 - t * 4.75 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.05, vec3(0.46, 0.58, 0.55), vec3(0.43, 0.36, 0.38), vec3(0.76, 1.35, 1.21), vec3(0.11, 0.81, 0.32));
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
