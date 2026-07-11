uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.27 + sr * 7.51 - t * 0.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.24) * p;
	p = rot2(length(p) * -2.99 + time * 1.00) * p;
	p = fract(p * 1.27) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.33, 1.52, 0.86) + vec3(0.07, 0.19, 0.15);
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
