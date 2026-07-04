uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.16;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.11 * sin(t * 1.75 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.79, length(p) * 3.72 - time * 0.95); }
	p = fract(p * 1.75) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.15));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.33 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
