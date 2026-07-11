uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.12 + vec2(t * 2.42, -t * 2.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	p = rot2(p.y * 3.97 + time * 0.55) * p;
	p = rot2(length(p) * 1.13 + time * 0.59) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(2.24) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.14, 0.14), vec3(0.82, 0.73, 0.77), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
