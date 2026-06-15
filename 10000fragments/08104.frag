uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.13 * cos(sa * 4 + t * 0.97 + ph);
    v = sin((sr - petal) * 19.20);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	p = rot2(time * -1.35) * p;
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 3.62 - time * 0.20); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(2.59) * p; }
	p = rot2(length(p) * -3.05 + time * 1.19) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
