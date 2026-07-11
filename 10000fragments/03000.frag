uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.62 + vec2(t * 0.38, -t * 0.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.31; p = rot2(1.07) * p; }
	p = rot2(time * -0.71) * p;
	p = rot2(p.y * -2.99 + time * 0.44) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
