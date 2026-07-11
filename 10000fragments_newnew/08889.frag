uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.99) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.95 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.90) * p * 12.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 1.17 + time * 0.09, vec3(0.45, 0.58, 0.56), vec3(0.35, 0.32, 0.36), vec3(1.13, 1.03, 0.81), vec3(0.04, 0.15, 0.38)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
