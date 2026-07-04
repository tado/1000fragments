uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.26 - t * 0.68;
    v = sin(floor(lv * 5.0) / 5.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.28) * p * 16.60;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.00, 0.09, 0.01), vec3(0.82, 0.71, 0.65), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.18 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
