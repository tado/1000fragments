uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.33 * pow(abs(cos(ra * 3.0 + t * 2.81)), 1.42);
    v = sin((rr - pet) * 13.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.78) * p * 21.38;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.38 + time * 0.01, vec3(0.58, 0.42, 0.44), vec3(0.40, 0.44, 0.48), vec3(0.73, 0.77, 1.33), vec3(0.31, 0.53, 0.08)) * v;
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 2.83 + time * 15.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
