uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.72 + vec2(t * 0.38, -t * 2.61) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	p *= 1.84;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(0.63) * p; }
	p += vec2(-0.97, 0.12) * sin(length(p) * 2.34 - time * 2.21) * 0.28;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.15, 0.58), vec3(0.94, 0.86, 0.75), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
