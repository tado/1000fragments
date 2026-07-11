uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.33;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.95) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.13) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.16 + (time * 0.76) * 1.07) * 0.20;
	float d = 0.5 + 0.5 * field(p, (time * 0.76), 0.0);
	vec2 hq = rot2(0.69) * p * 12.86;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.78, 0.75, 0.74), vec3(0.05, 0.11, 0.00), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.973, 1.026) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
