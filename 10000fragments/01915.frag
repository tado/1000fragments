uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.66 + sr * 18.31 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(0.82) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 1.26, 0.56) + vec3(0.02, 0.12, 0.12);
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
