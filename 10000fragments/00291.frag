uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.36 + sin(p.y * 4.05 + t * 1.02) * 2.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.83) * p * 17.52;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.73, 0.71, 0.88), vec3(0.06, 0.02, 0.01), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
