uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.48 + t * 4.53 + ph) + sin(p.y * 8.33 - t * 4.53 + ph)
        + sin((p.x + p.y) * 10.24 + t * 4.53 + ph) + sin(length(p) * 11.22 - t * 4.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p = fract(p * 2.99) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.50, 0.38), vec3(0.90, 0.55, 0.44), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
