uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.84 + t * 3.08 + ph) + sin(p.y * 8.97 - t * 4.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 2.88 - time * 0.81); }
	p += vec2(0.57, 0.07) * sin(length(p) * 3.38 - time * 1.24) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.03);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.82 + time * 6.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
