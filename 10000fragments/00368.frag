uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.19 * cos(sa * 5.0 + t * 0.93 + ph);
    v = sin((sr - petal) * 11.88);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.23) * p * 16.57;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.73, 0.77, 0.81), vec3(0.15, 0.03, 0.03), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
