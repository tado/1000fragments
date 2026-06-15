uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.29 + t * 4.66 + ph) + sin(p.y * 9.54 - t * 4.66 + ph)
        + sin((p.x + p.y) * 6.68 + t * 4.66 + ph) + sin(length(p) * 10.96 - t * 4.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.37) * p;
	p = fract(p * 2.57) - 0.5;
	p += vec2(-0.70, -0.52) * sin(length(p) * 3.92 - time * 1.09) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.11, vec3(0.57, 0.42, 0.53), vec3(0.45, 0.49, 0.48), vec3(0.89, 1.24, 1.33), vec3(0.15, 0.23, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
