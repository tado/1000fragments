uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.83 + t * 3.84 + ph) + sin(p.y * 3.14 - t * 3.84 + ph)
        + sin((p.x + p.y) * 2.48 + t * 3.84 + ph) + sin(length(p) * 9.00 - t * 3.84 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.80;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.25, vec3(0.54, 0.59, 0.58), vec3(0.45, 0.32, 0.31), vec3(1.28, 0.76, 1.35), vec3(0.05, 0.10, 0.85));
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
