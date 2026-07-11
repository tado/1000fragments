uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.92 + t * 3.29 + ph) + sin(p.y * 13.92 - t * 1.09 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(2.75) * p;
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 4.52 - time * 0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
