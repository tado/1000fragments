uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.01 + vec2(t * 0.57, -t * 0.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(1.39) * p;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.14));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
