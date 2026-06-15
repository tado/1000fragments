uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 31.53 - t * 6.32 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 14.16 - t * 6.32 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.31 + t * 1.72 + ph) + sin(p.y * 4.99 - t * 1.72 + ph)
        + sin((p.x + p.y) * 3.00 + t * 1.72 + ph) + sin(length(p) * 4.15 - t * 1.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.09 + time * 0.64) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.65 + time * 0.10, vec3(0.53, 0.49, 0.48), vec3(0.37, 0.44, 0.45), vec3(1.26, 0.91, 0.81), vec3(0.11, 0.82, 0.64));
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
