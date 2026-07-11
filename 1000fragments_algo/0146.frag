uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.24 + sr * 18.64 - t * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.58) * 0.54), cos((time * 0.58) * 0.45)) * 0.09;
	p *= 2.35;
	p = rot2((time * 0.58) * 0.80) * p;
	float d = 0.5 + 0.5 * field(p, (time * 0.58), 0.0);
	vec3 col = mix(vec3(0.75, 0.65, 0.76), vec3(0.11, 0.07, 0.00), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.95 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.985, 1.000) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
