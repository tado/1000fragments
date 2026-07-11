uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.25 * cos(sa * 9 + t * 1.55 + ph);
    v = sin((sr - petal) * 18.05);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	p = abs(p) - 0.71;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(2.23) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
