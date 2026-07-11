uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.94 + vec2(t * 1.96, -t * 1.96) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(1.83) * p; }
	p = rot2(time * -0.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.84), field(p, time, 1.68));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
