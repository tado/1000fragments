uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.72 + t * 2.66 + ph) + sin(p.y * 10.51 - t * 2.66 + ph)
        + sin((p.x + p.y) * 8.40 + t * 2.66 + ph) + sin(length(p) * 9.61 - t * 2.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.69) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 3.13 - time * 0.53); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.48, 0.50), vec3(0.73, 0.76, 0.70), d);
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
