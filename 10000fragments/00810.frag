uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.00 + sin(p.y * 3.29 + t * 5.41) * 4.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.82, 1.36, 1.17) + vec3(0.09, 0.03, 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
