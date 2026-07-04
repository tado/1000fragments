uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.83 - t * 8.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.31) * p * 8.22;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.00, 0.07, 0.12), vec3(0.94, 0.83, 0.87), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.80 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
