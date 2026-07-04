uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.84;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.27 + 0.10 * sin(t * 1.66 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 5.72 - time * 0.34); }
	p = sin(p * 2.42 + time * 2.45) * 0.62;
	p = rot2(length(p) * -1.10 + time * 0.53) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
