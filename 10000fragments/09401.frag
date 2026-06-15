uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.14 * cos(sa * 3 + t * 0.91 + ph);
    v = sin((sr - petal) * 11.04);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(2.25) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
