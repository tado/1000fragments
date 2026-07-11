uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.14 + t * 2.30 + ph) * 0.7;
    float wb = sin(p.y * 13.59 - t * 1.52 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.24;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.48 + t * 1.50 + ph) + sin(p.y * 11.08 - t * 1.50 + ph)
        + sin((p.x + p.y) * 10.92 + t * 1.50 + ph) + sin(length(p) * 16.01 - t * 1.50 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.11 + time * 1.03) * p;
	p = rot2(2.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.74 + time * 0.17, vec3(0.44, 0.46, 0.40), vec3(0.32, 0.41, 0.36), vec3(1.40, 1.07, 0.95), vec3(0.37, 0.56, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
