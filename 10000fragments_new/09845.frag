uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.83 + t * 4.15 + ph) + sin(p.y * 15.49 - t * 4.32 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	p = fract(p * 2.07) - 0.5;
	p = abs(p) - 0.70;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.10 + time * 0.18);
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 1.35 + time * 4.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
