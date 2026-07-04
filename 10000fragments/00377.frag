uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.05 + t * 0.29) - 0.5) * 2.0;
    v = sin((p.y * 3.73 + zx * 0.56 + t * 1.98) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.69) * p * 9.22;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.72 + time * 0.07, vec3(0.45, 0.57, 0.41), vec3(0.35, 0.33, 0.37), vec3(0.82, 1.10, 0.89), vec3(0.40, 0.99, 0.62)) * v;
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.24 + time * 8.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
