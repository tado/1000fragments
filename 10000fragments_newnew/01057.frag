uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.70;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.08 * sin(t * 2.70 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.35) * p; }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.85));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
