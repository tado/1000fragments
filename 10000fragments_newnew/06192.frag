uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.71) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 0.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 12.24;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.46 + time * 0.07, vec3(0.49, 0.49, 0.50), vec3(0.39, 0.37, 0.47), vec3(1.22, 0.92, 1.25), vec3(0.44, 0.34, 0.43)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
