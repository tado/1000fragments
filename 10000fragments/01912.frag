uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.39 + sr * 8.69 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	{ p = vec2(atan(p.y, p.x) * 1.13, length(p) * 3.47 - time * 0.13); }
	p = abs(p) - 0.47;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	p = rot2(length(p) * -3.55 + time * 0.74) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.50, 0.82, 0.67) + vec3(0.06, 0.20, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
