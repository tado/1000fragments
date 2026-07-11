uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.54 + t * 3.29 + ph) + sin(p.y * 16.63 - t * 0.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	{ p = vec2(atan(p.y, p.x) * 2.23, length(p) * 4.78 - time * 0.18); }
	p += vec2(-0.08, 0.33) * sin(length(p) * 3.12 - time * 0.77) * 0.10;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.65 + time * 0.02);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
