uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.20 + sin(p.y * 3.11 + t * 0.99) * 4.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.29 + t * 1.26 + ph) + sin(p.y * 5.69 - t * 1.26 + ph)
        + sin((p.x + p.y) * 10.05 + t * 1.26 + ph) + sin(length(p) * 16.13 - t * 1.26 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(p.y * -1.86 + time * 0.47) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = d1 + d2;
	vec3 col = palette(d * 1.63 + time * 0.12, vec3(0.57, 0.52, 0.55), vec3(0.36, 0.42, 0.43), vec3(0.96, 0.82, 0.87), vec3(0.90, 0.06, 0.39));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
