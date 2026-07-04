uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.21 * cos(sa * 9.0 + t * 0.79 + ph);
    v = sin((sr - petal) * 12.03);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.35));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
