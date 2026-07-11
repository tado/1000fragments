uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.23 + t * 3.75 + ph) + sin(p.y * 4.58 - t * 3.75 + ph)
        + sin((p.x + p.y) * 10.56 + t * 3.75 + ph) + sin(length(p) * 7.58 - t * 3.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.08;
	p = sin(p * 2.85 + time * 2.15) * 1.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.23, 0.21, 0.11), vec3(0.89, 0.57, 0.70), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
