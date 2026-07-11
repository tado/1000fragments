uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.19 + sr * 8.93 - t * 1.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p = fract(p * 1.46) - 0.5;
	p = rot2(length(p) * 3.32 + time * 1.18) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.10));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
