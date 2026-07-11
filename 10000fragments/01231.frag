uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.21 + t * 2.43 + ph) + sin(p.y * 8.51 - t * 2.43 + ph)
        + sin((p.x + p.y) * 10.26 + t * 2.43 + ph) + sin(length(p) * 11.57 - t * 2.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.21 + time * 0.09);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
