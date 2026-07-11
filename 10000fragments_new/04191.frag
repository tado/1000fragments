uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.74 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.00, 1.44, 0.90) + vec3(0.08, 0.21, 0.01);
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
