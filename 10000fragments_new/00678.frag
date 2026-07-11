uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.28 + vec2(t * 1.60, -t * 2.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p.y += sin(p.x * 6.84 + time * 3.63) * 0.38;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.55; p = rot2(0.45) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.28, 0.39), vec3(0.93, 0.79, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
