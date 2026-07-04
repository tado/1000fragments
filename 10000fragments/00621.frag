uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.79, t * 1.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.40) * p * 18.15;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.94 + time * 0.10, vec3(0.45, 0.44, 0.50), vec3(0.46, 0.41, 0.41), vec3(1.34, 0.91, 1.26), vec3(0.36, 0.21, 0.99)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
