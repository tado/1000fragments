uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.39 - t * 5.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	p = (floor(p * 13.9) + 0.5) / 13.9;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.74; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.99));
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.23, 0.49), vec3(0.98, 0.80, 0.42), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
