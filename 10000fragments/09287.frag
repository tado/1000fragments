uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.54 + t * 1.51 + ph) + sin(p.y * 9.95 - t * 2.58 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = rot2(p.y * 2.48 + time * 0.93) * p;
	{ p = vec2(atan(p.y, p.x) * 1.15, length(p) * 5.83 - time * 0.33); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.69));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
