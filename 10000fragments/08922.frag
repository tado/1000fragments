uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.17, t * 0.64 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.61) * p * 13.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.75 + time * 0.25, vec3(0.53, 0.53, 0.40), vec3(0.42, 0.38, 0.36), vec3(0.85, 0.73, 0.81), vec3(0.34, 0.89, 0.93)) * v;
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
