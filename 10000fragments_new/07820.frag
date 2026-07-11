uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.16 * cos(sa * 6.0 + t * 2.20 + ph);
    v = sin((sr - petal) * 19.05);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p = (floor(p * 17.5) + 0.5) / 17.5;
	p = abs(p) - 0.58;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	p *= 2.47;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
