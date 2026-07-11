uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.32 + t * 0.80) - 0.5) * 2.0;
    v = sin((p.y * 2.13 + zx * 1.03 + t * 2.25) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.72) * p * 21.83;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.38 + time * 0.15, vec3(0.55, 0.52, 0.41), vec3(0.39, 0.46, 0.31), vec3(1.06, 0.83, 0.96), vec3(0.64, 0.44, 0.74)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
