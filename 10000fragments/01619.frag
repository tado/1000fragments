uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.73 - t * 5.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.64, 0.70, 1.09) + vec3(0.02, 0.21, 0.26);
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
