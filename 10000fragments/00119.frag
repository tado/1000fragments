uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.82 + t * 4.08 + ph) + sin(p.y * 14.91 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	p = fract(p * 1.28) - 0.5;
	p += vec2(-0.79, 0.37) * sin(length(p) * 3.32 - time * 0.79) * 0.13;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.42, 0.13), vec3(0.68, 0.71, 0.97), d);
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
