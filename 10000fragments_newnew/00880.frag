uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.86 + t * 1.37 + ph) * 0.7;
    float wb = sin(p.y * 4.04 - t * 3.70 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.45;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.83) * p * 19.14;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.11, 0.09, 0.15), vec3(0.98, 0.98, 0.69), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.98 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
