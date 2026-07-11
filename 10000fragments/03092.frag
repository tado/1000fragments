uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.51 + vec2(t * 1.30, -t * 1.30) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(1.36) * p; }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.04, 0.12), vec3(0.53, 0.80, 0.71), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
