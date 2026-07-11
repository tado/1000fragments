uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.69;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.05 * sin(t * 1.76 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	p *= 1.0 + 0.35 * sin(time * 4.06);
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 4.34 - time * 0.95); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
