uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.67 - t * 8.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.00, length(p) * 2.90 - time * 0.78); }
	p = rot2(2.56) * p;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	p += vec2(-0.65, 0.97) * sin(length(p) * 3.88 - time * 1.03) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.61));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
