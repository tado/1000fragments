uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.08 + t * 2.18 + ph) + sin(p.y * 11.74 - t * 2.18 + ph)
        + sin((p.x + p.y) * 10.48 + t * 2.18 + ph) + sin(length(p) * 6.75 - t * 2.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(length(p) * -3.80 + time * 0.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.16, vec3(0.48, 0.53, 0.48), vec3(0.32, 0.35, 0.35), vec3(0.87, 0.90, 1.18), vec3(0.44, 0.38, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
