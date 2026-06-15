uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.31 + t * 2.13 + ph) + sin(p.y * 3.77 - t * 5.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p *= 2.21;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(1.22) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
