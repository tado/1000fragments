uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.12 + vec2(t * 0.67, -t * 0.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p = abs(p);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(0.39) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
