uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.76 + vec2(t * 2.87, -t * 2.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.43; p = rot2(2.16) * p; }
	p = rot2(p.y * 1.23 + time * 0.42) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.45));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
