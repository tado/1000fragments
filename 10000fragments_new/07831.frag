uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.19 * pow(abs(cos(ra * 2.0 + t * 0.77)), 2.20);
    v = sin((rr - pet) * 11.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 3.00, length(p) * 3.48 - time * 0.52); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.01, 0.29), vec3(0.66, 0.66, 0.43), d);
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
