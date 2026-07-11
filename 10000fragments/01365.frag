uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.62 + t * 4.17 + ph) + sin(p.y * 11.29 - t * 4.17 + ph)
        + sin((p.x + p.y) * 4.46 + t * 4.17 + ph) + sin(length(p) * 4.01 - t * 4.17 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.97 + t * 1.11 + ph) + sin(p.y * 12.41 - t * 1.11 + ph)
        + sin((p.x + p.y) * 6.90 + t * 1.11 + ph) + sin(length(p) * 13.40 - t * 1.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	p = rot2(p.y * -1.16 + time * 0.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = d1 * d2;
	vec3 col = palette(d * 1.37 + time * 0.29, vec3(0.40, 0.58, 0.42), vec3(0.34, 0.41, 0.42), vec3(1.25, 0.93, 0.88), vec3(0.84, 0.66, 0.59));
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
