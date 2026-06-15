uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 36.85 - t * 2.87 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 14.10 - t * 2.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.33, 0.28), vec3(0.95, 0.70, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
