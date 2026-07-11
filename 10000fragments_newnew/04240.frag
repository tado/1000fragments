uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.79 + t * 0.80 + ph) + sin(p.y * 5.51 - t * 0.80 + ph)
        + sin((p.x + p.y) * 8.04 + t * 0.80 + ph) + sin(length(p) * 7.21 - t * 0.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.99) * p * 21.41;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.63 + time * 0.26, vec3(0.52, 0.54, 0.55), vec3(0.48, 0.40, 0.45), vec3(0.76, 1.05, 0.76), vec3(0.32, 0.86, 0.36)) * v;
	col *= 0.81 + 0.11 * sin(gl_FragCoord.y * 1.00 + time * 14.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
