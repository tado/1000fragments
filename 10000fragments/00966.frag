uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.50 + t * 3.49 + ph) + sin(p.y * 13.06 - t * 3.49 + ph)
        + sin((p.x + p.y) * 2.32 + t * 3.49 + ph) + sin(length(p) * 13.90 - t * 3.49 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	p = fract(p * 2.92) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.17, 0.22), vec3(0.54, 0.89, 0.77), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
