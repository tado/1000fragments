uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 20.87 - t * 3.90 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 39.30 - t * 3.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 0.98, 1.17) + vec3(0.06, 0.00, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
