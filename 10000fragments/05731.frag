uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.87 + t * 2.65 + ph) + sin(p.y * 7.43 - t * 2.65 + ph)
        + sin((p.x + p.y) * 9.97 + t * 2.65 + ph) + sin(length(p) * 13.24 - t * 2.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.25, 0.53), vec3(0.65, 0.91, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
