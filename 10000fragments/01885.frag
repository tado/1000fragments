uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.46 + sr * 23.59 - t * 2.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(2.60) * p; }
	p = abs(p) - 0.76;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
