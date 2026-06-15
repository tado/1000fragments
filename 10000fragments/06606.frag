uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.25 * cos(sa * 5 + t * 1.95 + ph);
    v = sin((sr - petal) * 12.39);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.89, length(p) * 3.65 - time * 0.61); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(0.97) * p; }
	p *= 1.95;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.61));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
