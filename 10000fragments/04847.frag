uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.73 - t * 4.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.42) * p * 17.07;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.61 + time * 0.13, vec3(0.46, 0.48, 0.53), vec3(0.42, 0.35, 0.45), vec3(1.31, 0.77, 1.10), vec3(0.27, 0.19, 0.58)) * v;
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
