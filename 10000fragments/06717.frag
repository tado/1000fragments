uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.10;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.28 + 0.09 * sin(t * 2.31 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(2.08) * p; }
	p = (floor(p * 16.1) + 0.5) / 16.1;
	p = rot2(p.y * -1.18 + time * 1.06) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.20, 0.46), vec3(0.65, 0.66, 0.59), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
