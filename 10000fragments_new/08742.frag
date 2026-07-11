uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.47 + sin(p.y * 4.21 + t * 5.45) * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.73, length(p) * 4.84 - time * 0.73); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.20, 0.30), vec3(0.75, 0.95, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
