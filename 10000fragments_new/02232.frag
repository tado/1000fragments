uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.45 + 0.25 * pow(abs(cos(ra * 4.0 + t * 2.35)), 2.94);
    v = sin((rr - pet) * 10.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p *= 2.19;
	p = fract(p * 1.20) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.06));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
