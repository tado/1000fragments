uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.46 + t * 0.58 + ph) + sin(p.y * 13.99 - t * 0.58 + ph)
        + sin((p.x + p.y) * 8.63 + t * 0.58 + ph) + sin(length(p) * 6.25 - t * 0.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.43) * p * 10.68;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 0.54 + time * 0.27, vec3(0.59, 0.50, 0.56), vec3(0.36, 0.37, 0.48), vec3(1.16, 1.22, 1.08), vec3(0.96, 0.15, 0.38)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
