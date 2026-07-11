uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.32 + sr * 7.85 - t * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	p = rot2(1.56) * p;
	p += vec2(-0.50, -0.76) * sin(length(p) * 4.27 - time * 1.32) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.22));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
