uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.18 + t * 2.21 + ph) + sin(p.y * 5.20 - t * 4.07 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.45) * p * 23.43;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.69 + time * 0.13, vec3(0.57, 0.51, 0.42), vec3(0.44, 0.48, 0.47), vec3(0.94, 1.15, 1.07), vec3(0.96, 0.14, 0.47)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
