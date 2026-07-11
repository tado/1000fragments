uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.26 * pow(abs(cos(ra * 5.0 + t * 2.79)), 1.47);
    v = sin((rr - pet) * 21.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.20; p = rot2(0.68) * p; }
	p = rot2(3.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.20, 0.59, 0.18) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 2.34 + time * 6.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
