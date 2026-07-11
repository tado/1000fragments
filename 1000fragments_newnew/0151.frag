uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.17 * pow(abs(cos(ra * 2.0 + t * 2.96)), 2.37);
    v = sin((rr - pet) * 18.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	float d = field(p, (time * 0.57), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.54, 0.46, 0.43) + vec3(0.09, 0.08, 0.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.966, 0.990) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
