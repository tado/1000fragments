uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.82 + t * 1.35 + ph) + sin(p.y * 13.32 - t * 1.35 + ph)
        + sin((p.x + p.y) * 8.55 + t * 1.35 + ph) + sin(length(p) * 3.13 - t * 1.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.14) - 0.5;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.85));
	p = abs(p);
	p *= 1.54;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.11, vec3(0.42, 0.58, 0.55), vec3(0.40, 0.47, 0.34), vec3(1.06, 1.38, 1.27), vec3(0.86, 0.47, 0.56));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
