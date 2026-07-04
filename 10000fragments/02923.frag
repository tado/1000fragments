uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.22) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.02) * p * 19.76;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.63 + time * 0.19, vec3(0.40, 0.58, 0.55), vec3(0.47, 0.39, 0.37), vec3(0.96, 0.79, 0.86), vec3(0.87, 0.66, 0.64)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
