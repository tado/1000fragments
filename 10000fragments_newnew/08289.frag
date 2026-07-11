uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.24 + vec2(t * 0.34, -t * 1.93) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	p = rot2(time * 0.61) * p;
	p *= 1.29;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.15; p = rot2(0.38) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
