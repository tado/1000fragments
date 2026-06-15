uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.93 - t * 4.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.11, 0.51) * sin(length(p) * 5.92 - time * 1.42) * 0.28;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.36, 0.51), vec3(0.67, 0.79, 0.96), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
