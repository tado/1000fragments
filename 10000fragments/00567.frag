uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.02 + sr * 12.08 - t * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p += vec2(0.66, 0.71) * sin(length(p) * 5.40 - time * 1.40) * 0.26;
	{ float fr = length(p); p *= 1.0 + 0.77 * fr * fr; }
	p = fract(p * 2.85) - 0.5;
	p *= 3.49;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
