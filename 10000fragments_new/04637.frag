uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.45 + 0.26 * pow(abs(cos(ra * 4.0 + t * 2.52)), 1.26);
    v = sin((rr - pet) * 23.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.10; p = rot2(1.60) * p; }
	p = rot2(p.y * -3.57 + time * 0.36) * p;
	p = fract(p * 2.70) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.31, 1.46, 1.38) + vec3(0.22, 0.23, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
