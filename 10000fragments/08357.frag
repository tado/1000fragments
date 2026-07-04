uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.85 + t * 2.14 + ph) + sin(p.y * 4.95 - t * 1.38 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.75) * p * 12.36;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 0.81 + time * 0.19, vec3(0.57, 0.57, 0.42), vec3(0.32, 0.33, 0.40), vec3(0.92, 0.98, 1.15), vec3(0.07, 0.92, 0.25)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
