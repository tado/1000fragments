uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.27 * pow(abs(cos(ra * 6.0 + t * 1.04)), 2.69);
    v = sin((rr - pet) * 23.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	p += vec2(0.41, 0.81) * sin(length(p) * 4.27 - time * 1.53) * 0.29;
	p = (floor(p * 7.6) + 0.5) / 7.6;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.27; p = rot2(1.52) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.74));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
