uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.63 + t * 3.63 + ph) + sin(p.y * 3.42 - t * 3.63 + ph)
        + sin((p.x + p.y) * 8.73 + t * 3.63 + ph) + sin(length(p) * 11.79 - t * 3.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.43, 0.00), vec3(0.89, 0.71, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
