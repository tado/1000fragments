uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.17, t * 0.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.17) * p * 21.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.02 + time * 0.29, vec3(0.50, 0.47, 0.55), vec3(0.34, 0.33, 0.38), vec3(0.94, 0.75, 0.93), vec3(0.66, 0.72, 0.87)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
