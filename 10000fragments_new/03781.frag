uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.64 + t * 2.30 + ph) + sin(p.y * 10.63 - t * 2.30 + ph)
        + sin((p.x + p.y) * 9.34 + t * 2.30 + ph) + sin(length(p) * 14.13 - t * 2.30 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.87) * p;
	p = rot2(p.y * 1.66 + time * 1.05) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.14, vec3(0.46, 0.40, 0.53), vec3(0.33, 0.46, 0.48), vec3(1.02, 0.71, 1.19), vec3(0.01, 0.83, 0.64));
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 1.20 + time * 5.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
