uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.00 + sin(p.y * 3.43 + t * 2.47) * 3.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, (time * 0.74), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.65, 0.58, 0.63) + vec3(0.10, 0.10, 0.11);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.989, 0.927) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
