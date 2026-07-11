uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.11 + sin(p.y * 2.43 + t * 2.21) * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	p = fract(p * 1.38) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 3.55 - time * 0.32); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 2.88 + time * 0.54) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.07, 0.58), vec3(0.84, 0.66, 0.46), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
