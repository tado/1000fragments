uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.25 + vec2(t * 2.57, -t * 2.28) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.95; }
	p = rot2(1.94) * p;
	{ p = vec2(atan(p.y, p.x) * 1.45, length(p) * 5.46 - time * 0.72); }
	p = rot2(time * 0.54) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
