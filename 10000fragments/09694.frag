uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.29 * cos(sa * 9.0 + t * 2.21 + ph);
    v = sin((sr - petal) * 10.27);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 2.05 - time * 0.95); }
	p = abs(p);
	p = (floor(p * 16.2) + 0.5) / 16.2;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.47));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
