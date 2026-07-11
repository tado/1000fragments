uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.97 + t * 1.40 + ph) + sin(p.y * 13.57 - t * 3.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.61) * p;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	p *= 3.26;
	p = rot2(length(p) * 3.68 + time * 0.90) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.12));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
