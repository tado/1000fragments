uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.64 - t * 6.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p = rot2(length(p) * -2.31 + time * 0.22) * p;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	p = rot2(2.97) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.23));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
