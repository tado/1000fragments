uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.81 + t * 0.52 + ph) + sin(p.y * 15.57 - t * 3.35 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.05) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.18 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2(time * 0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.98 + time * 0.13, vec3(0.60, 0.51, 0.47), vec3(0.31, 0.33, 0.47), vec3(0.95, 1.07, 1.32), vec3(0.81, 0.64, 0.38));
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
