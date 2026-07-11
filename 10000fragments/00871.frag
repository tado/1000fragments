uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.84 + sin(p.y * 4.52 + t * 5.64) * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.74) - 0.5;
	p += vec2(-0.18, 0.82) * sin(length(p) * 5.01 - time * 1.13) * 0.26;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.13, 0.02), vec3(0.53, 0.98, 0.66), d);
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
