uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.84, t * 1.06 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.79) * p * 23.77;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.79, 0.76, 0.93), vec3(0.15, 0.11, 0.18), v);
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
