uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.92 + t * 2.16 + ph) + sin(p.y * 9.53 - t * 2.16 + ph)
        + sin((p.x + p.y) * 9.91 + t * 2.16 + ph) + sin(length(p) * 6.33 - t * 2.16 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	p = fract(p * 1.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.20, vec3(0.50, 0.55, 0.59), vec3(0.43, 0.48, 0.39), vec3(1.20, 1.16, 1.16), vec3(0.98, 0.52, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
