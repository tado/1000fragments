uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.19 + t * 2.70 + ph) + sin(p.y * 9.51 - t * 1.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.11, 0.34), vec3(0.86, 0.88, 0.90), d);
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
