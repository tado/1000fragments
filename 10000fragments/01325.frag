uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.97 + t * 1.88 + ph) + sin(p.y * 12.15 - t * 1.88 + ph)
        + sin((p.x + p.y) * 6.03 + t * 1.88 + ph) + sin(length(p) * 7.72 - t * 1.88 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.19) - 0.5;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.02, vec3(0.60, 0.48, 0.42), vec3(0.41, 0.41, 0.39), vec3(1.17, 0.94, 1.04), vec3(0.85, 0.36, 0.32));
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
