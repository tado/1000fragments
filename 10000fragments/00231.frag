uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.28 * cos(sa * 9 + t * 1.15 + ph);
    v = sin((sr - petal) * 12.54);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p = rot2(2.15) * p;
	p *= 1.32;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(1.51) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.92));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
