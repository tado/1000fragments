uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 17.29 - t * 3.64 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 26.12 - t * 3.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	p += vec2(-0.82, 0.18) * sin(length(p) * 5.58 - time * 1.52) * 0.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.44, 0.42), vec3(0.71, 0.96, 0.66), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
