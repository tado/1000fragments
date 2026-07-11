uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.31 + vec2(t * 2.54, -t * 2.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.49; p = rot2(0.85) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
