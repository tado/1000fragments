uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.61) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 2.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.55) * p * 9.92;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.80 + time * 0.19, vec3(0.53, 0.48, 0.58), vec3(0.39, 0.37, 0.31), vec3(1.36, 1.40, 0.97), vec3(0.63, 0.24, 0.62)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
