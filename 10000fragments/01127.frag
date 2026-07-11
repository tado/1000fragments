uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.78 + t * 4.70 + ph) + sin(p.y * 2.85 - t * 4.70 + ph)
        + sin((p.x + p.y) * 4.36 + t * 4.70 + ph) + sin(length(p) * 8.84 - t * 4.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	p += vec2(0.53, -0.17) * sin(length(p) * 2.88 - time * 1.65) * 0.33;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.95 + time * 0.04);
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
