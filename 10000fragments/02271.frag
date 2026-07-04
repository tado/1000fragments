uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.23 * cos(sa * 5.0 + t * 1.09 + ph);
    v = sin((sr - petal) * 9.12);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.67) * p * 9.15;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.06, 0.11, 0.06), vec3(0.90, 0.92, 0.78), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
