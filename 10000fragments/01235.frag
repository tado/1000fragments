uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.70 + t * 2.21 + ph) + sin(p.y * 11.87 - t * 2.21 + ph)
        + sin((p.x + p.y) * 9.25 + t * 2.21 + ph) + sin(length(p) * 15.97 - t * 2.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.76;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.45, 0.10), vec3(0.68, 0.81, 0.54), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
