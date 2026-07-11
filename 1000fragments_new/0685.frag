uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.21 * cos(sa * 9.0 + t * 1.25 + ph);
    v = sin((sr - petal) * 6.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.80) * p * 16.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.15, 0.03, 0.17), vec3(0.96, 0.90, 0.78), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
