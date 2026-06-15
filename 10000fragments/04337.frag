uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.04 + t * 5.61 + ph) + sin(p.y * 10.25 - t * 2.15 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.91, -0.03) * sin(length(p) * 2.20 - time * 1.64) * 0.36;
	p = abs(p) - 0.45;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 4.00 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.90 + time * 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
