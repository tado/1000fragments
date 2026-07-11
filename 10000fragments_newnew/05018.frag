uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.85, t * 1.07 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.73) * p * 8.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.12, 0.02, 0.04), vec3(0.93, 1.00, 0.80), v);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.77 + time * 7.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
