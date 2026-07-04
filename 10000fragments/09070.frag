uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.93 + t * 4.01 + ph) + sin(p.y * 11.74 - t * 4.01 + ph)
        + sin((p.x + p.y) * 11.19 + t * 4.01 + ph) + sin(length(p) * 11.89 - t * 4.01 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.08) * p * 8.88;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.10 + time * 0.05, vec3(0.54, 0.46, 0.57), vec3(0.43, 0.38, 0.38), vec3(0.82, 1.12, 1.03), vec3(0.56, 0.04, 0.44)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
