uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.52 + t * 2.71 + ph) + sin(p.y * 10.92 - t * 2.71 + ph)
        + sin((p.x + p.y) * 4.11 + t * 2.71 + ph) + sin(length(p) * 16.08 - t * 2.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	p = rot2(length(p) * -2.22 + time * 0.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.27, vec3(0.58, 0.53, 0.59), vec3(0.42, 0.49, 0.35), vec3(1.15, 1.29, 1.11), vec3(0.48, 0.84, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
