uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.39 + t * 2.50 + ph) + sin(p.y * 7.06 - t * 2.50 + ph)
        + sin((p.x + p.y) * 8.35 + t * 2.50 + ph) + sin(length(p) * 10.00 - t * 2.50 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.93) * p * 15.76;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.04, 0.13, 0.09), vec3(0.98, 0.95, 0.78), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
