uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.79 + sin(p.y * 4.54 + t * 3.05) * 3.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.45) * p * 18.67;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.46 + time * 0.04, vec3(0.44, 0.57, 0.60), vec3(0.44, 0.37, 0.36), vec3(1.02, 1.13, 0.94), vec3(0.50, 0.33, 0.04)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
