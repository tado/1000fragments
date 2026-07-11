uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.74 - t * 6.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.50, 0.42) * sin(length(p) * 3.02 - time * 1.83) * 0.26;
	{ p = vec2(atan(p.y, p.x) * 1.79, length(p) * 2.49 - time * 0.27); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.74 + time * 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
