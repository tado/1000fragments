uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.28 * pow(abs(cos(ra * 5.0 + t * 0.61)), 2.23);
    v = sin((rr - pet) * 15.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p *= 2.12;
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	p.x += sin(p.y * 7.67 + time * 3.64) * 0.32;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.23, 0.15, 0.29) * (0.16 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
