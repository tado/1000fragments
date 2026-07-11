uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.60) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 3.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.89) * p * 16.75;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 0.91 + time * 0.15, vec3(0.40, 0.59, 0.54), vec3(0.43, 0.36, 0.40), vec3(1.22, 1.12, 1.16), vec3(0.72, 0.86, 0.57)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
