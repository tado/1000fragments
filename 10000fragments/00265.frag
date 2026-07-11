uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.90 + t * 2.22 + ph) + sin(p.y * 4.98 - t * 2.15 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.92 + t * 2.03 + ph) + sin(p.y * 8.32 - t * 1.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.85) * p;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 5.20 - time * 0.37); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = d1 * d2;
	vec3 col = palette(d * 0.51 + time * 0.15, vec3(0.50, 0.54, 0.49), vec3(0.37, 0.35, 0.40), vec3(1.03, 0.84, 1.04), vec3(0.89, 0.16, 0.98));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
