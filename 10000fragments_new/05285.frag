uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.23 * pow(abs(cos(ra * 4.0 + t * 1.55)), 2.54);
    v = sin((rr - pet) * 13.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = (floor(p * 10.2) + 0.5) / 10.2;
	p *= 2.64;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.94));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 1.64 + time * 17.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
